Class('ShareBoard.Model.Board.Element.Curve', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    has : {
        segments        : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            this.segments.push('M', this.x, this.y)
        },
        
        
        addPoint : function (x, y) {
            this.segments.push('L', x, y)
        },
        
        
        getPath     : function () {
            return this.segments + ''
        }
    }
})
