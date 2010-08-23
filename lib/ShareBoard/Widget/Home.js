Class('ShareBoard.Widget.Home', {
    
    isa : Ext.Panel,
    
    
    does : 'Symbie.Widget',
    
    
    use : {
        token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
        presence    : 'Raphael'
    },
    
    
    has : {
        canvas      : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                title : 'yo',
                
                height : 800,
                
                tbar : [
                    {
                        text : 'Line'
                    },
                    {
                        text : 'Circle'
                    },
                    {
                        text : 'Ellipse'
                    }
                ]
            })
        }
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var body = this.body
            
            var canvas = this.canvas = Raphael(body.dom, '100%', '100%')
            
            this.mon(body, 'mousedown', this.onMouseDown, this)
            this.mon(body, 'mousedown', this.onMouseMove, this)
            this.mon(body, 'mouseup', this.onMouseUp, this)
        }
    },
            
            
    methods : {
        
        onMouseDown : function (e) {
//            debugger
            
            alert('ClientX=' + (e.browserEvent.offsetX || e.browserEvent.layerX))
            alert('ClientY=' + (e.browserEvent.offsetY || e.browserEvent.layerY))
        },
        
        
        onMouseUp : function () {
        },
        
        
        onMouseMove : function () {
        }
    }
    
})
