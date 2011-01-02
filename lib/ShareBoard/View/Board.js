Class('ShareBoard.View.Board', {
    
    isa     : Ext.Panel,
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        
        'ShareBoard.View.Tool',
        'ShareBoard.View.Tool.Line',
        'ShareBoard.View.Tool.Circle'
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
        
        selection       : Joose.I.Array,
        
        replica         : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            var drawTools = this.drawTools = {}
            
            ShareBoard.View.Tool.each(function (toolClass, id) {
                
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
            
//            this.getTool('cursor').activate()
            
            this.activateTool('line')
            
            this.setupBoard()
        }
    },
            
        
    
    methods : {
        
        getID   : function (config) {
            return this.meta.name + ':' + config.board.uuid
        },
        
        
        setupBoard : function () {
            var me          = this
            var board       = this.board
            var replica     = board.replica
            
            board.each(function (element) {
                
                me.onNewBoardElement(board, element)
            })
            
            replica.onNewInstanceOf('ShareBoard.Model.Board.Element', this.onNewBoardElement, this)
            
//            replica.onNewInstanceOf('ShareBoard.Model.Board.Cursor', this.onNewBoardElement, this)
        },
        
        
        onNewBoardElement : function (event, element) {
            console.log('ON NEW ELEMENT:' + element.meta.name)
            
            var widgetClass = eval(element.widgetClass)
            
            if (!widgetClass) debugger
            
            var widget = new widgetClass({
                
                boardWidget : this,
                model       : element
            })
            
            this.addWidget(widget)
            
            widget.render()
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
        },
        
        
        onBeforeSelect : function (widget) {
            Joose.A.each(this.selection, function (selectedWidget) {
                
                selectedWidget.deselect()
            })
            
            this.selection = [ widget ]
        },
        
        
        onDragStart : function () {
            // suspend own events, which translates the updates from body
            this.suspendEvents()
        },
        
        
        onDragEnd : function () {
            this.resumeEvents()
        }
    }
})