Class('ShareBoard.Widget.Board.Tool.Curve', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Curve',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        startX          : null,
        startY          : null,
        
        curve           : null,
        widget          : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.curve
            delete this.widget
        },
        
        
        onMouseDown : function (event) {
            if (this.curve) this.reset()
            
            this.curve = new ShareBoard.Model.Board.Element.Curve({
                board   : this.boardWidget.board,
                
                x       : this.getLayerX(event),
                y       : this.getLayerY(event)
            })            
        },
        
        
        
        onMouseUp : function () {
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
                    
                    data        : this.curve
                })
            }
            
            this.reset()
        },
        
        
        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            var curve = this.curve
            
            if (curve) {
                
                curve.addPoint(x, y)
                
                var widget = this.widget
                
                if (!widget) {
                    this.widget = this.getPaper().path( curve.getPath() )
                    
                    this.widget.attr({
                        opacity             : 0.2,
                        stroke              : 'green',
                        'stroke-dasharray'  : "- ",
                        'stroke-width'      : 2
                    })
                } else
                    widget.attr({
                        path : curve.getPath()
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


ShareBoard.Widget.Board.Tool.register('curve', ShareBoard.Widget.Board.Tool.Curve)