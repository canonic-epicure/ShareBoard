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
            
            this.line = new ShareBoard.Model.Board.Element.Line({
                x       : this.getLayerX(event),
                y       : this.getLayerY(event),
                
                board   : this.boardWidget.board
            })
        },
        
        
        onMouseUp : function (event) {
            var widget = this.widget
            
            if (widget) {
                
                widget.attr({
                    opacity         : 1,
                    stroke          : 'blue',
                    'stroke-width'  : 3
                }) 
                
                this.boardWidget.publishStep({
                    
                    tool        : 'line',
                    
                    type        : 'put',
                    isFinal     : true,
                    
                    data        : this.line
                })
            }
            
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
                    
                    this.widget.attr({
                        opacity             : 0.2,
                        stroke              : 'green',
                        'stroke-dasharray'  : "- ",
                        'stroke-width'      : 2
                    })
                } else
                    widget.attr({
                        path : line.getPath()
                    })

                    
                this.boardWidget.publishStep({
                    
                    tool        : 'line',
                    
                    type        : 'move',
                    isFinal     : false,
                    
                    x           : x,
                    y           : y
                })
            }
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)