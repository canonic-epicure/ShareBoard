Role('ShareBoard.View.Board.Element.Draggable', {
    
    requires            : [ 'getBoardWidget', 'getModel' ],

    augment : {
        
        render : function () {
            var original
            var boardWidget     = this.getBoardWidget()
            var model           = this.getModel()
            var me              = this
            
            this.clicker.drag(function (dx, dy) {
                
                model.moveTo( original[0] + dx, original[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                original = [ model.getX(), model.getY() ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.INNER()
        }
    }
})
