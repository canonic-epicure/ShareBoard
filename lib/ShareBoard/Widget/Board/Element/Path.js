Class('ShareBoard.Widget.Board.Element.Path', {
    
    isa     : 'ShareBoard.Widget.Board.Element',
    
    
    use     : 'ShareBoard.Model.Board.Element.Path',
    
    
    has : {
        
    },
    
    
    methods : {
        
        createBoardElement : function () {
            return new ShareBoard.Model.Board.Element.Path({
                board   : this.boardWidget.board,
                
                layerX  : this.layerX,
                layerY  : this.layerY
            })
        },
        
        
        render : function () {
            this.raphaelNode = this.getPaper().path(this.element.getPath())
        }
    }
})
