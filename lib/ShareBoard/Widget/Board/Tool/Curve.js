Class('ShareBoard.Widget.Board.Tool.Curve', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        startX          : null,
        startY          : null,
        
        line            : null,
        raph            : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.startX
            delete this.startY
            
            delete this.line
        },
        
        
        onMouseDown : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            this.line = new ShareBoard.Model.Board.Element.Path({
                board   : this.boardWidget.board,
                
                layerX  : x,
                layerY  : y
            })            
        },
        
        
        
        onMouseUp : function () {
            delete this.line
            delete this.raph
        },
        
        
        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            
            if (this.line != null) {
                
                this.line.addPoint(x, y)
                
                if (!this.raph) {
                    this.raph = this.getPaper().path(this.line.getPath())
                    
                    return
                }
                
                this.raph.attr({
                    path : this.line.getPath()
                })
            }
        }
    }
})


ShareBoard.Widget.Board.Tool.register('curve', ShareBoard.Widget.Board.Tool.Curve)