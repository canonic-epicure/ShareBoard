Class('ShareBoard.View.Board.Element.Line', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var line    = this.model
            
            var raphael = this.raphael = this.getPaper().path( line.getPath() )
            
            raphael.attr({
                opacity             : board.view.phantomOpacity,
                stroke              : board.view.phantomColor,
                'stroke-dasharray'  : board.view.phantomDashing,
                'stroke-width'      : board.view.phantomWidth
            })
        },
        
        
        onAttributeMutate : function (object, attrName, value, hasOldValue, oldValue) {
            var line        = this.model
            var raphael     = this.raphael
            
            if (attrName == 'status' && oldValue == 'draft') {
                var board   = this.getBoard()
                
                raphael.attr({
                    opacity             : 1,
                    stroke              : board.view.currentColor,
                    'stroke-dasharray'  : board.view.currentDashing,
                    'stroke-width'      : board.view.currentWidth
                })
            } else
                raphael.attr({
                    path : line.getPath()
                })
        }
    }
})
