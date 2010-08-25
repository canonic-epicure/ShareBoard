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
        
        currentEl   : null,
        
        
        currentTool : 'line',
        
        
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
        
        
        drawTools       : null
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
                me.mon(body, event, function (e) {
                    
                    me.fireEvent(event, e)
                })
            })
            
            this.drawTools[ this.currentTool ].activate()
        }
    },
            
            
    methods : {
        
        toolToogled : function (button, state) {
            var tools = this.drawTools
            
            if (state && button.toolID == 'circle') {
                tools.line.deActivate()
                tools.circle.activate()
            }
            
            if (state && button.toolID == 'line') {
                tools.circle.deActivate()
                tools.line.activate()
            }
        }
    }
    
})