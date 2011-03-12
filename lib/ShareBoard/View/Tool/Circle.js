Class('ShareBoard.View.Tool.Circle', {
    
    isa     : 'ShareBoard.View.Tool',
    
    does    : 'ShareBoard.View.Tool.MouseTracker',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    methods : {
        
        createElement : function () {
            var board = this.getBoard()
            
            return new ShareBoard.Model.Board.Element.Circle({
                x       : this.firstX,
                y       : this.firstY,
                
                color   : board.view.getElementColor(),
                
                board   : board,
                replica : board.replica
            })
        },
        
        
        drawElement : function (circle, layerX, layerY) {
            
            circle.setRadiusFromPoint(layerX, layerY)
        }
    },
    
    
    body : function () {
        
        ShareBoard.View.Tool.register('circle', this)
    }
})
