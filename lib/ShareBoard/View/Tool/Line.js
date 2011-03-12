Class('ShareBoard.View.Tool.Line', {
    
    isa     : 'ShareBoard.View.Tool',
    
    does    : 'ShareBoard.View.Tool.MouseTracker',
    
    use     : [
        'ShareBoard.Model.Board.Element.Line'
    ],
    
    methods : {
        
        createElement : function (event) {
            var board = this.getBoard()
            
            return new ShareBoard.Model.Board.Element.Line({
                x       : this.firstX,
                y       : this.firstY,
                
                x1      : this.firstX,
                y1      : this.firstY,
                
                color   : board.view.getCurrentColor(),
                
                board   : board,
                replica : board.replica
            })
        },
        
        
        drawElement : function (line, layerX, layerY) {
            
            line.setX1(layerX)
            line.setY1(layerY)
        }
    },
    

    body : function () {
        
        ShareBoard.View.Tool.register('line', this)
    }
})


