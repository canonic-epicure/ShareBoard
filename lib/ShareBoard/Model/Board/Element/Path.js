Class('ShareBoard.Model.Board.Element.Path', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    has : {
        segments        : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            this.segments.push('M 0 0')
        },
        
        
        addPoint : function (x, y) {
            this.segments.push.apply(this.segments, [ 'L', x, y ] )
        },
        
        
        getPath     : function () {
            return this.segments + ''
        }
    }
})
