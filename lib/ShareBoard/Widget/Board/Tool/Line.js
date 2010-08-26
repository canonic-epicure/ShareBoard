Class('ShareBoard.Widget.Board.Tool.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Line',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        line            : null,
        widget          : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.line
            delete this.widget
        },
        
        
        onMouseDown : function (event) {
            if (this.line) this.reset()
            
            debugger
            
            this.line = new ShareBoard.Model.Board.Element.Line({
                x       : this.getLayerX(event),
                y       : this.getLayerY(event),
                
                board   : this.boardWidget.board
            })
        },
        
        
        onMouseUp : function (event) {
            this.reset()
        },

        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            var line = this.line
            
            if (line) {
                
                line.setEndPoint(x, y)
                
                var widget = this.widget
                
                if (!widget) {
                    this.widget = this.getPaper().path( line.getPath() )
                    
                    return
                }
                
                widget.attr({
                    path : line.getPath()
                })
            }
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)