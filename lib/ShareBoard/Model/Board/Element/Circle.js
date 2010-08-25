Class('ShareBoard.Model.Board.Element.Circle', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    has : {
        radius        : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        addPoint : function (x, y) {
            this.radius = Math.sqrt( (this.layerX - x) * (this.layerX - x) + (this.layerY - y) * (this.layerY - y))
        }
        
    }
})
