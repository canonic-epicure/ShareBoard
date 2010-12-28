Class('ShareBoard.Model.Board.Element.Circle', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    has : {
        radius          : 0,
        
        widgetClass     : 'ShareBoard.View.Board.Element.Circle'
    },
    
    
    methods : {
        
        setRadiusFromPoint : function (x1, y1) {
            this.setRadius(
                Math.sqrt( (this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1) )
            )
        }
    }
})
