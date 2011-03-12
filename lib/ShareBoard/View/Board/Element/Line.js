Class('ShareBoard.View.Board.Element.Line', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    does    : [
        'ShareBoard.View.Board.Element.Selectable',
        'ShareBoard.View.Board.Element.Draggable'
    ],
    
    
    methods : {
        
        updatePosition : function () {
            var path        = this.model.getPath()
            
            this.raphael.attr({ path : path })
            this.clicker.attr({ path : path })
        },
        
        
        onAttributeMutate : function (event, mutation) {
            var attributeName       = mutation.attributeName
            
            if (attributeName == 'status')
                this.updateStyle()
            else
                this.updatePosition()
        }
    },
    
    
    augment : {
        
        render : function () {
            var path    = this.model.getPath()
            var paper   = this.getPaper()
            
            this.raphael  = paper.path( path )
            
            this.clicker  = paper.path( path )
            this.clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            this.updateStyle()
            
            this.INNER()
        },
        
        
        select : function () {
            this.INNER()
            
            var line            = this.model
            var boardWidget     = this.boardWidget
            
            var originalStart
            var originalEnd
            
            this.raphSelStart.drag(function (dx, dy) {
                
                line.setX( originalStart[0] + dx )
                line.setY( originalStart[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalStart = [ line.x, line.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            
            this.raphSelEnd.drag(function (dx, dy) {
                
                line.setX1( originalEnd[0] + dx )
                line.setY1( originalEnd[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalEnd = [ line.x1, line.y1 ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
        }
    }
})
