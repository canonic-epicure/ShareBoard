Class('ShareBoard.Model.Board.Element.Circle', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    has : {
        radius        : null
    },
    
    
    methods : {
        
        setEdgePoint : function (x1, y1) {
            this.radius = Math.sqrt( (this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1))
        }
        
    }
})
