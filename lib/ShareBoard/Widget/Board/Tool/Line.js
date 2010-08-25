Class('ShareBoard.Widget.Board.Tool.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackEvents     : { 
            init : { 'click' : 'onMouseClick', 'mousemove' : 'onMouseMove' } 
        },
        
        startX          : null,
        startY          : null,
        
        line            : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.startX
            delete this.startY
            
            delete this.line
        },
        
        
//        onMouseDown : function (event) {
//            this.startX = this.getLayerX(event)
//            this.startY = this.getLayerY(event)
//            
//            console.log('down')
//        },
        
        
        onMouseClick : function (event) {
            this.startX = this.getLayerX(event)
            this.startY = this.getLayerY(event)
            
            
//            console.log('click')
        },
        
        
        onMouseMove : function (event) {
//            console.log('move')
            
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            if (this.startX != null) {
                
                if (!this.line) {
                    this.line = this.getPaper().path( [ 'M', this.startX, this.startY, 'L', x, y ] + '')
                    
                    return
                }
                
                this.line.attr({
                    path : [ 'M', this.startX, this.startY, 'L', x, y ]
                })
            }
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)