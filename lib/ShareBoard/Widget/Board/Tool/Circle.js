Class('ShareBoard.Widget.Board.Tool.Circle', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        circle          : null,
        widget          : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.circle
            delete this.widget
        },
        
        
        onMouseDown : function (event) {
            if (this.circle) this.reset()
            
            this.circle = new ShareBoard.Model.Board.Element.Circle({
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
                    
                    tool        : 'circle',
                    
                    type        : 'put',
                    isFinal     : true,
                    
                    data        : this.circle
                })
            }
            
            this.reset()
        },

        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            var circle = this.circle
            
            if (circle) {
                
                circle.setEdgePoint(x, y)
                
                var widget = this.widget
                
                if (!widget) {
                    this.widget = this.getPaper().circle( circle.x, circle.y, circle.radius )
                    
                    this.widget.attr({
                        opacity             : 0.2,
                        stroke              : 'green',
                        'stroke-dasharray'  : "- ",
                        'stroke-width'      : 2
                    })
                } else
                    widget.attr({
                        r : circle.radius
                    })

                    
                this.boardWidget.publishStep({
                    
                    tool        : 'circle',
                    
                    type        : 'move',
                    isFinal     : false,
                    
                    x           : x,
                    y           : y
                })
            }
        }
        
    }
})


ShareBoard.Widget.Board.Tool.register('circle', ShareBoard.Widget.Board.Tool.Circle)

//
//
//Class('ShareBoard.Widget.Board.Element.Circle', {
//    
//    isa     : 'ShareBoard.Widget.Board.Element',
//    
//    
//    use     : 'ShareBoard.Model.Board.Element.Circle',
//    
//    
//    has : {
//        
//    },
//    
//    
//    methods : {
//        
//        createBoardElement : function () {
//            return new ShareBoard.Model.Board.Element.Circle({
//                board   : this.boardWidget.board,
//                
//                layerX  : this.layerX,
//                layerY  : this.layerY
//            })
//        },
//        
//        
//        render : function () {
//            this.raphaelNode = this.getPaper().circle(this.layerX, this.layerY, 0)
//        },
//        
//        
//        refresh : function () {
//            
//            this.raphaelNode.attr({
//                r : this.element.radius
//            })
//        },
//        
//        
//        onExternalMouseMove : function (layerX, layerY) {
//            this.element.addPoint(layerX, layerY)
//            
//            this.refresh()
//        },
//        
//        
//        onExternalMouseUp : function (layerX, layerY) {
//        }
//    }
//})
