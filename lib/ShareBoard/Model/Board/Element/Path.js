Class('ShareBoard.Model.Board.Element.Path', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    has : {
        segments        : Syncler.I.Array,
        
        widgetClass     : 'ShareBoard.View.Board.Element.Path'
    },
    
    
    methods : {
        
        addSegment : function (x1, y1) {
            this.setRadius(
                Math.sqrt( (this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1) )
            )
        }
    }
})
