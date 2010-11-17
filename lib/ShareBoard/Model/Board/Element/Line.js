Class('ShareBoard.Model.Board.Element.Line', {
    
//    XXX circular refs!
//    use     : 'ShareBoard.Widget.Board.Element.Line',
    
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    sync : {
        
        x1              : {
            required    : true 
        },
        
        y1              : {
            required    : true 
        }
    },
    
    
    has : {
        widgetClass : 'ShareBoard.Widget.Board.Element.Line'
    },
    
    
    methods : {
        
        sketch : function (x1, y1) {
            this.setX1(x1)
            this.setY1(y1)
//            
//            this.commit()
        },
        
        
        put : function (x1, y1) {
            this.setX1(x1)
            this.setY1(y1)
            
            this.setStatus('element')
//            
//            this.commit()
        },
        
        
        getPath     : function () {
            return [ 'M', this.x, this.y, 'L', this.x1, this.y1 ] + ''
        }
    }
})
