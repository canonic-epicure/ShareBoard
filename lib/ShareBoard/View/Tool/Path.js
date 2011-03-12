Class('ShareBoard.View.Tool.Path', {
    
    isa     : 'ShareBoard.View.Tool',
    
    does    : 'ShareBoard.View.Tool.MouseTracker',
    
    use     : [
        'ShareBoard.Model.Board.Element.Path'
    ],
    
    
    methods : {
        
        createElement : function () {
            
            var board = this.getBoard()
            
            return new ShareBoard.Model.Board.Element.Path({
                x       : this.firstX,
                y       : this.firstY,
                
                color   : board.view.getElementColor(),
                
                board   : board,
                replica : board.replica
            })
        },
        
        
        drawElement : function (path, layerX, layerY, prevX, prevY) {
            
            path.addSegment(layerX - prevX, layerY - prevY)
        }
    },

    
    body : function () {
        
        ShareBoard.View.Tool.register('path', this)
    }
})


