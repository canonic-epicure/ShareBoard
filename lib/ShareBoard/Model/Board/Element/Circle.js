Class('ShareBoard.Model.Board.Element.Circle', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    
    sync : {
        radius        : 0
    },
    
    
    has : {
        widgetClass : 'ShareBoard.Widget.Board.Element.Circle'
    },
    
    
    
    methods : {
        
        sketch : function (x1, y1) {
            this.setRadius(
                Math.sqrt( (this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1))
            )
            
            this.commit()
        },
        
        
        put : function (x1, y1) {
            this.setStatus('element')
            
            this.sketch(x1, y1)
        }
    }
})
