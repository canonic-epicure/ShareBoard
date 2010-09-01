Class('ShareBoard.Widget.Board.Element.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Line',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function (step) {
            var line    = this.model
            
            var dom     = this.dom = this.getPaper().path( line.getPath() )
            
            dom.attr({
                opacity             : 0.2,
                stroke              : 'green',
                'stroke-dasharray'  : "- ",
                'stroke-width'      : 2
            })
        },
        
        
        refresh : function (line) {
            this.dom.attr({
                path : line.getPath()
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

        
        
        
        
        
        
        
        moveEnding : function (x, y) {
            var line    = this.line || this.generateElement(x, y)
        
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
        },
        
        
        drawLine : function (x0, y0, x1, y1) {
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
        },
        
        
        reset : function () {
            delete this.line
            delete this.widget
        },
        
        
        generateElement : function (x, y) {
            return new ShareBoard.Model.Board.Element.Line({
                x       : x,
                y       : y,
                
                board   : this.boardWidget.board
            })
        },
        
        
        onMouseDown : function (event) {
//            console.log('mousedown')
            
            if (this.line) this.reset()
            
            
            var step = {
                tool        : 'line',
                
                method      : 'startLine',
                
                params      : [ this.getLayerX(event), this.getLayerY(event) ],
                
                isFinal     : false
            }
            
            this.processStep(step)
                
            this.boardWidget.publishStep(step)
            
        },
        
        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            var line = this.line
            
            if (line) {
                
                var step = {
                    
                    tool        : 'line',
                    
                    method      : 'moveEnding',
                    isFinal     : false,
                    
                    params      : [ x, y ]
                }
                
                this.processStep(step)
                    
                this.boardWidget.publishStep(step)
            }
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)