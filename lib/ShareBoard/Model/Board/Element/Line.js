Class('ShareBoard.Model.Board.Element.Line', {
    
    use     : 'ShareBoard.Widget.Board.Element.Line',
    
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    has : {
        x1          : null,
        y1          : null,
        
        widgetClass : Joose.I.FutureClass('ShareBoard.Widget.Board.Element.Line')
    },
    
    
    methods : {
        
        sketch : function (x1, y1) {
            this.x1 = x1
            this.y1 = y1
            
            this.SUPER(x1, y1)
        },
        
        
        put : function (x1, y1) {
            this.x1 = x1
            this.y1 = y1
            
            this.SUPER(x1, y1)
        },
        
        
        getPath     : function () {
            return [ 'M', this.x, this.y, 'L', this.x1, this.y1 ] + ''
        }
    }
})
