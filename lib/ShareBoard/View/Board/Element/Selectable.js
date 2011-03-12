Role('ShareBoard.View.Board.Element.Selectable', {
    
    requires            : [ 'getModel', 'updatePosition', 'select', 'deselect' ],
    
    
    has : {
        selSize         : 8,
        
        raphSelStart    : null,
        raphSelEnd      : null
    },
    
    
    methods : {
        
        getSelXStart : function () {
            return this.getModel().getX()
        },
        
        
        getSelYStart : function () {
            return this.getModel().getY()
        },
        
        
        getSelXEnd : function () {
            return this.getModel().getX1()
        },
        
        
        getSelYEnd : function () {
            return this.getModel().getY1()
        }
    },
    
    
    after : {
        
        updatePosition : function () {
            
            if (this.isSelected) {
                var selSize             = this.selSize
                
                this.raphSelStart.attr({
                    x               : this.getSelXStart() - selSize / 2,
                    y               : this.getSelYStart() - selSize / 2
                })
                
                this.raphSelEnd.attr({
                    x               : this.getSelXEnd() - selSize / 2,
                    y               : this.getSelYEnd() - selSize / 2
                })
            }
        }
    },
    
    
    augment : {
        
        select : function () {
            var selSize             = this.selSize
            var model               = this.getModel()
            
            this.raphSelStart       = this.getPaper().rect(
                this.getSelXStart() - selSize / 2, this.getSelYStart() - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelStart.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            
            this.raphSelEnd       = this.getPaper().rect(
                this.getSelXEnd() - selSize / 2, this.getSelYEnd() - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelEnd.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            this.INNER()
        },
        
        
        deselect : function () {
            this.raphSelStart.remove()
            this.raphSelEnd.remove()
            
            delete this.raphSelStart
            delete this.raphSelEnd
            
            this.INNER()
        }
    }
})
