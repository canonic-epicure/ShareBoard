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
        },
        
        'ShareBoard.Widget.Board.Element.Path',
        'ShareBoard.Widget.Board.Element.Circle'
    ],
    
    
    has : {
        
        paper       : null,
        
        board       : { required : true },
        
        currentEl   : null,
        
        
        currentTool : 'line',
        
        
        mouseEvents : {
            init : [
                'mousedown',
                'mouseup',
                
                'click',
                'dblclick',
                
                'mousemove',
                
                'mouseover',
                'mouseout'
            ]
        }
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            var tools = {}
            
            ShareBoard.Widget.Board.Tool.each(function (toolClass, id) {
                tools[ id ] = new toolClass()
            })
            
            this.addEvents.apply(this, this.mouseEvents)
            
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
//                    {
//                        xtype   : 'checkbox',
//                        boxLabel: 'Smooth'
//                    },
//                    '-',
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
            
            this.relayEvent(body, this.mouseEvents)
        }
    },
            
            
    methods : {
        
        toolToogled : function (button, state) {
            if (state && button.toolID == 'circle') this.currentTool = 'circle'
            
            if (state && button.toolID == 'line') this.currentTool = 'line'
        },
        
        
        getLayerX : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetX || extjsEvent.browserEvent.layerX
        },
        
        
        getLayerY : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetY || extjsEvent.browserEvent.layerY
        }
    }
    
})