Class('ShareBoard.Widget.Board.Element.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Element',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function (step) {
            
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
        
        
        onSketch : function () {
            this.raphael.attr({
                path : this.model.getPath()
            })
        },
        
        
        onPut : function () {
            var board   = this.getBoard()
            
            this.raphael.attr({
                opacity             : 1,
                stroke              : board.view.currentColor,
                'stroke-dasharray'  : board.view.currentDashing,
                'stroke-width'      : board.view.currentWidth
            })
        },
        
        
        onMutate : function (object, value, mutation) {
            var model = this.model
            
            if (model.status == 'draft') this.onSketch()
            
            if (model.status == 'element') this.onPut()
        }
    }
})
