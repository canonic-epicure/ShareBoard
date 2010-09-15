Class('ShareBoard.Widget.Board.Element.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Element',
    
    use     : 'ShareBoard.Model.Board.Element.Line',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function (step) {
            
            var board   = this.board

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
            var board   = this.board
            
            this.raphael.attr({
                opacity             : 1,
                stroke              : board.view.currentColor,
                'stroke-dasharray'  : board.view.currentDashing,
                'stroke-width'      : board.view.currentWidth
            })
        },
        
        
        onMutate : function (channel, object, packet) {
            var model = this.model
            
            if (model.status == 'draft') this.onSketch()
            
            if (model.status == 'element') this.onPut()
        }
    }
})
