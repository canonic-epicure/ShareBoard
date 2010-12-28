Class('ShareBoard.Widget.Board.Element.Circle', {
    
    isa     : 'ShareBoard.Widget.Board.Element',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function (step) {
            var board   = this.board
            var circle  = this.model
            
            var raphael = this.raphael = this.getPaper().circle( circle.x, circle.y, circle.radius )
            
            raphael.attr({
                opacity             : board.view.phantomOpacity,
                stroke              : board.view.phantomColor,
                'stroke-dasharray'  : board.view.phantomDashing,
                'stroke-width'      : board.view.phantomWidth
            })
        },
        
        
        onSketch : function () {
            this.raphael.attr({
                r : this.model.getRadius()
            })
        },
        
        
        onPut : function () {
            var board   = this.board
            
            this.raphael.attr({
                r                   : this.model.getRadius(),
                
                opacity             : 1,
                stroke              : board.view.currentColor,
                'stroke-dasharray'  : board.view.currentDashing,
                'stroke-width'      : board.view.currentWidth
            })
        },
        
        
        onMutate : function (replica, object, packet) {
            var model = this.model
            
            if (model.status == 'draft') this.onSketch()
            
            if (model.status == 'element') this.onPut()
        }
    }
})
