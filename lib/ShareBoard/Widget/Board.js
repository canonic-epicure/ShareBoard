Class('ShareBoard.Widget.Board', {
    
    isa : Ext.Panel,
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        }
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
        currentTool     : null
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
                    },
                    '-',
                    {
                        text            : 'Curve',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        allowDepress    : false,
                        
                        toolID          : 'curve',
                        
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
            
            this.drawTools.cursor.activate()
            
            this.activateTool('line')
        }
    },
            
            
    methods : {
        
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