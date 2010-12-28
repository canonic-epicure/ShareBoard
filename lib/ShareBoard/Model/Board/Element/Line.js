Class('ShareBoard.Model.Board.Element.Line', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    has : {
        x1              : { required : true },
        y1              : { required : true },
        
        widgetClass     : 'ShareBoard.View.Board.Element.Line'
    },
    
    
    methods : {
        
        getPath     : function () {
            return [ 'M', this.x, this.y, 'L', this.x1, this.y1 ] + ''
        }
    }
})
