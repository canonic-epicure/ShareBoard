Class('ShareBoard.View.Board', {
    
    isa     : Ext.Panel,
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        
        'ShareBoard.View.Tool',
        'ShareBoard.View.Tool.Line',
        'ShareBoard.View.Tool.Circle',
        'ShareBoard.View.Tool.Cursor'
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
                
                tbar : new Ext.Toolbar({
                    slots   : true,
                    
                    items   : [
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
                        },
                        '-',
                        {
                            xtype           : 'container',
                            slot            : 'colorIndicator',
                            
                            cls             : 'sh-color-indicator'
                        },
                        {
                            text            : 'Color',
                            
                            toolID          : 'color',
                            
                            menu            : new Ext.menu.ColorMenu({
                                
                                listeners   : {
                                    select  : this.onColorSelect,
                                    scope   : this
                                }
                            })
                        }
                    ]

                })
            })
            
            Ext.getDoc().on('keydown', this.onKeyDown, this)
            
            this.on('afterlayout', this.setupBoard, this, { single : true })
        }
    },
    
    
    methods : {
        
        setupBoard : function () {
            
            var body    = this.body
            
            this.paper = Raphael(body.dom, '100%', '100%')
            
            
            var me = this
            
            Joose.A.each(this.trackMouseEvents, function (event) {
                
                body.relayEvent(event, me)
            })
            
            this.getTool('cursor').activate()
            
            this.activateTool('line')
            
            this.updateColorIndicator()
            
            
            var me          = this
            var board       = this.board
            var replica     = board.replica
            
            board.each(function (element) {
                me.onNewBoardElement(board, element)
            })
            
            board.FLASH.each(function (flash) {
                var cursor = flash.get('cursor')
                
                if (cursor) me.onNewBoardElement(board, cursor)
            })
            
            
            board.elementsByUUID.on('/mutation/apply/Syncler.Mutation.Object.Remove', this.onBoardElementRemove, this)
            
            replica.onNewInstanceOf('ShareBoard.Model.Board.Element', this.onNewBoardElement, this)
            
            board.view.on('/mutation/commit/Syncler.Mutation.Class.Attribute', this.updateColorIndicator, this)
        },
        
        
        onNewBoardElement : function (event, element) {
            // do not visualize own cursor
            if (element instanceof ShareBoard.Model.Board.Element.Cursor)
                if (element == this.board.getOwnFlash().get('cursor')) return
            
            var widgetClass = eval(element.widgetClass)
            
            if (!widgetClass) debugger
            
            var widget = new widgetClass({
                
                boardWidget : this,
                model       : element
            })
            
            this.addWidget(widget)
            
            widget.render()
        },
        
        
        onBoardElementRemove : function (source, mutation) {
            var element     = mutation.oldValue
            
            var widget      = this.getWidget(element.uuid)
            
            widget.remove()
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
        
        
        onKeyDown : function (event) {
            if (event.getCharCode() == event.DELETE) 
                Joose.A.each(this.selection, function (selectedWidget) {
                    
                    console.log('removing %s', selectedWidget.model.uuid)
                    
                    selectedWidget.model.remove()
                })
        },
        
        
        onBeforeSelect : function (widget) {
            Joose.A.each(this.selection, function (selectedWidget) {
                
                selectedWidget.deselect()
            })
            
            this.selection = [ widget ]
        },
        
        
        onColorSelect : function (source, color) {
            this.board.view.setCurrentColor('#' + color)
            
            this.updateColorIndicator()
        },
        
        
        updateColorIndicator : function () {
            this.getTopToolbar().slots.colorIndicator.el.setStyle('background-color', this.board.view.getCurrentColor())
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
