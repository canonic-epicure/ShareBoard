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
            
            this.addEvents.apply(this, this.trackMouseEvents)
            
            Ext.apply(this, {
                
//                title : 'ShareBoard draw area',
                
                height : 800,
                
                bodyCssClass : 'ShareBoard-Board',
                
                tbar : new Ext.Toolbar({
                    slots   : true,
                    
                    items   : [
                        {
                            text            : 'Freehand',
                            iconCls         : 'sb-icon-curve',
                            
                            scale           : 'large',
                            
                            enableToggle    : true,
                            toggleGroup     : 'tools',
                            
                            pressed         : true,
                            allowDepress    : false,
                            
                            toolID          : 'path',
                            
                            toggleHandler   : this.toolToogled,
                            scope           : this
                        },
                        '-',
                        {
                            text            : 'Line',
                            iconCls         : 'sb-icon-line',
                            
                            scale           : 'large',
                            
                            enableToggle    : true,
                            toggleGroup     : 'tools',
                            
                            allowDepress    : false,
                            
                            toolID          : 'line',
                            
                            toggleHandler   : this.toolToogled,
                            scope           : this
                        },
                        '-',
                        {
                            text            : 'Circle',
                            iconCls         : 'sb-icon-circle',
                            
                            scale           : 'large',
                            
                            
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
                        },
                        '-',
                        {
                            text            : 'Clear all',
                            iconCls         : 'sb-icon-eraser',
                            
                            scale           : 'large',
                            
                            handler         : this.onClearAll,
                            scope           : this
                        }
                    ]

                })
            })
            
            this.mon(Ext.getDoc(), 'keydown', this.onKeyDown, this)
            
            this.on('afterlayout', this.setupBoard, this, { single : true })
        }
    },
    
    
    methods : {
        
        setupBoard : function () {
            var me      = this
            var body    = this.body
            
            this.paper = Raphael(body.dom, '100%', '100%')
            
            Joose.A.each(this.trackMouseEvents, function (event) {
                
                body.relayEvent(event, me)
            })
            
            
            var drawTools = this.drawTools = {}
            
            ShareBoard.View.Tool.each(function (toolClass, id) {
                
                drawTools[ id ] = new toolClass({
                    boardWidget : this
                })
            }, this)
            
            
            this.getTool('cursor').activate()
            this.activateTool('path')
            
            this.updateColorIndicator()
            
            
            var board       = this.board
            var replica     = board.replica
            
            board.each(function (element) {
                me.onNewBoardElement(null, element)
            })
            
            board.FLASH.each(function (flash) {
                var cursor = flash.get('cursor')
                
                if (cursor) me.onNewBoardElement(null, cursor)
            })
            
            
            Ext.get(this.paper.canvas).on('click', this.onBoardClick, this )
            
            
            board.elementsByUUID.on('/mutation/commit/Syncler.Mutation.Object.Remove',  this.onBoardElementRemove, this)
            board.view.on('/mutation/commit/Syncler.Mutation.Class.Attribute',          this.updateColorIndicator, this)
            
            replica.onNewInstanceOf('ShareBoard.Model.Board.Element',                   this.onNewBoardElement, this)
        },
        
        
        onNewBoardElement : function (event, element, e) {
            console.log('onNewBoardElement, widgetClass: %s, event.source: %s', element.widgetClass, e && e.source.uuid)
            
//            var uuid        = e && e.source.uuid
//            if (uuid && this.widgetsByUUID[ uuid ]) debugger
            
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
        
        
        onClearAll : function () {
            this.board.each(function (element) {
                element.remove()
            })
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
                    
                    selectedWidget.model.remove()
                })
        },
        
        
        onBoardClick : function (event) {
            var target = event.getTarget()
            
            if (target.getAttribute('class') != 'sh-element') return
            
            var widget = this.getWidget(target.getAttribute('uuid'))
            
            this.select(widget)
        },
        
        
        
        select : function (widget) {
            Joose.A.each(this.selection, function (selectedWidget) {
                
                selectedWidget.deselect()
            })
            
            this.selection = [ widget ]
            
            widget.select()
        },
        
        
        onColorSelect : function (source, color) {
            this.board.view.setElementColor('#' + color)
        },
        
        
        updateColorIndicator : function () {
            this.getTopToolbar().slots.colorIndicator.el.setStyle('background-color', this.board.view.getElementColor())
        },
        
        
        onDragStart : function () {
            // suspend own events, which translates the updates from body
            // prevents from creation of new elements during dragging
            this.suspendEvents()
        },
        
        
        onDragEnd : function () {
            this.resumeEvents()
        }
    }
})
