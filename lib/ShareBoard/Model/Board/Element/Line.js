Class('ShareBoard.Model.Board.Element.Line', {
    
//    XXX circular refs!
//    use     : 'ShareBoard.Widget.Board.Element.Line',
    
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    has : {
        x1          : null,
        y1          : null,
        
        widgetClass : 'ShareBoard.Widget.Board.Element.Line'
    },
    
    
    methods : {
        
        sketch : function (x1, y1) {
            this.mutate({
                x1  : x1,
                y1  : y1
            })
        },
        
        
        put : function (x1, y1) {
            this.mutate({
                x1      : x1,
                y1      : y1,
                
                status  : 'put'
            })
        },
        
        
        getPath     : function () {
            return [ 'M', this.x, this.y, 'L', this.x1, this.y1 ] + ''
        }
    }
})
