Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Panel,
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        'ShareBoard.Widget.Board.Tool',
        'ShareBoard.Widget.Board.Tool.Line',
        'ShareBoard.Widget.Board.Tool.Circle'
    ],
    
    
    has : {
        paper       : null,
        
        board       : { required : true },
        
        trackMouseEvents : {
            init : [
                'mousedown',
                'mouseup',
                
                'click',
                'dblclick',
                
                'mousemove',
                
                'mouseover',
                'mouseout'
            ]
        },
        
        drawTools       : null,
        currentTool     : null,
        
        widgetsByUUID   : Joose.I.Object,
        
        channel         : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            var drawTools = this.drawTools = {}
            
            ShareBoard.Widget.Board.Tool.each(function (toolClass, id) {
                
                drawTools[ id ] = new toolClass({
                    boardWidget : this
                })
            }, this)
            
            
            this.addEvents.apply(this, this.trackMouseEvents)
            
            Ext.apply(this, {
                
                title : 'ShareBoard draw area',
                
                height : 800,
                
                bodyCssClass : 'ShareBoard-Board',
                
                tbar : [
                    {
                        text            : 'Line',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        pressed         : true,
                        allowDepress    : false,
                        
                        toolID          : 'line',
                        
                        toggleHandler   : this.toolToogled,
                        scope           : this
                    },
                    '-',
                    {
                        text            : 'Circle',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        allowDepress    : false,
                        
                        toolID          : 'circle',
                        
                        toggleHandler   : this.toolToogled,
                        scope           : this
                    }
                ]
            })
        }
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var body    = this.body
            
            this.paper = Raphael(body.dom, '100%', '100%')
            
            
            var me = this
            
            Joose.A.each(this.trackMouseEvents, function (event) {
                
                body.relayEvent(event, me)
            })
            
//            this.drawTools.cursor.activate()
            
            this.activateTool('line')
            
            this.setupBoard()
        }
    },
            
        
    
    methods : {
        
        getID   : function (config) {
            return this.meta.name + ':' + config.board.uuid
        },
        
        
        setupElement : function (element) {
            element.on('mutation', this.onElementMutation, this)
        },
        
        
        setupBoard : function () {
            var me          = this
            var board       = this.board
            var channel     = board.channel
            
            board.on('new-element', this.onNewBoardElement, this)
            
            board.each(function (element) {
                
                me.onNewBoardElement(board, element)
            })
            

            channel.on('mutation', function (channel, instance, mutation) {
                
                if ((mutation instanceof Syncler.Vero.Mutation.Create) && (instance instanceof ShareBoard.Model.Board.Element)) me.onNewBoardElement(board, instance)
            })
        },
        
        
        onNewBoardElement : function (board, element) {
            var widgetClass = eval(element.widgetClass)
            
            if (!widgetClass) debugger
            
            var widget = new widgetClass({
                
                boardWidget : this,
                model       : element
            })
            
            this.addWidget(widget)
            
            this.setupElement(element)
            
            widget.render()
        },
        
        
        onElementMutation : function (object, value, mutation) {
            this.getWidget(object.uuid).onMutate(object, value, mutation)
        },
        
        
        addWidget : function (widget) {
            this.widgetsByUUID[ widget.uuid ] = widget
        },
        
        
        getWidget : function (uuid) {
            var widget = this.widgetsByUUID[ uuid ]
            
            if (!widget) debugger
            
            return widget
        },
        
        
        getTool : function (toolID) {
            return this.drawTools[ toolID ]
        },
        
        
        activateTool : function (toolID) {
            var currentTool = this.currentTool
            
            if (currentTool) this.getTool(currentTool).deActivate()
            
            this.currentTool = toolID
            
            this.getTool(toolID).activate()
        },
        
        
        toolToogled : function (button, state) {
            if (state) this.activateTool(button.toolID)
        }
    }
})
