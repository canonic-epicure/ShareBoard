Class('ShareBoard.View.Board.Element.Circle', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    does    : [
        'ShareBoard.View.Board.Element.Selectable',
        'ShareBoard.View.Board.Element.Draggable'
    ],

    
    methods : {
        
        getSelXStart : function () {
            var circle = this.model
            
            return circle.x - circle.radius
        },
        
        
        getSelYStart : function () {
            return this.model.y
        },
        
        
        getSelXEnd : function () {
            var circle = this.model
            
            return circle.x + circle.radius
        },
        
        
        getSelYEnd : function () {
            return this.model.y
        },
        
        
        updatePosition : function () {
            var circle          = this.model
            
            this.raphael.attr({
                cx  : circle.x,
                cy  : circle.y,
                r   : circle.radius
            })
            
            this.clicker.attr({
                cx  : circle.x,
                cy  : circle.y,
                r   : circle.radius
            })
        }
    },
    
    
    augment : {
        
        render : function () {
            var circle  = this.model
            
            this.raphael  = this.getPaper().circle( circle.x, circle.y, circle.radius )
            
            this.clicker  = this.getPaper().circle( circle.x, circle.y, circle.radius )
            this.clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            this.INNER()
        },
        

        select : function () {
            this.INNER()
            
            var originalStart
            var originalEnd
            var boardWidget     = this.boardWidget
            var circle          = this.model
            
            
            this.raphSelStart.drag(function (dx, dy) {
                
                circle.setRadiusFromPoint( originalStart[0] + dx, originalStart[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalStart = [ circle.x - circle.radius, circle.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            
            this.raphSelEnd.drag(function (dx, dy) {
                
                circle.setRadiusFromPoint( originalEnd[0] + dx, originalEnd[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalEnd = [ circle.x + circle.radius, circle.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
        }
    }
    
})
