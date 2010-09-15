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
                opacity             : board.phantomOpacity,
                stroke              : board.phantomColor,
                'stroke-dasharray'  : board.phantomDashing,
                'stroke-width'      : board.phantomWidth
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
                stroke              : board.currentColor,
                'stroke-dasharray'  : board.currentDashing,
                'stroke-width'      : board.currentWidth
            })
        },
        
        
        onMutate : function (channel, object, packet) {
            var model = this.model
            
            if (model.status == 'draft') this.onSketch()
            
            if (model.status == 'element') this.onPut()
        }
    }
})
