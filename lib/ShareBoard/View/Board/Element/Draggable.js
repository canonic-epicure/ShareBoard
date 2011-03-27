Role('ShareBoard.View.Board.Element.Draggable', {
    
    requires            : [ 'getBoardWidget', 'getModel' ],

    augment : {
        
        render : function () {
            var origin
            
            var boardWidget     = this.getBoardWidget()
            var model           = this.getModel()
            
            this.clicker.drag(function (dx, dy) {
                
                model.moveTo( origin[0] + dx, origin[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                origin = [ model.getX(), model.getY() ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.INNER()
        }
    }
})
