Class('ShareBoard.Widget.Board.Tool.Circle', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackMouse      : [ 'Down', 'Up', 'Move' ]
    },
    
    
    methods : {
        
    }
})


ShareBoard.Widget.Board.Tool.register('circle', ShareBoard.Widget.Board.Tool.Circle)

//
//
//Class('ShareBoard.Widget.Board.Element.Circle', {
//    
//    isa     : 'ShareBoard.Widget.Board.Element',
//    
//    
//    use     : 'ShareBoard.Model.Board.Element.Circle',
//    
//    
//    has : {
//        
//    },
//    
//    
//    methods : {
//        
//        createBoardElement : function () {
//            return new ShareBoard.Model.Board.Element.Circle({
//                board   : this.boardWidget.board,
//                
//                layerX  : this.layerX,
//                layerY  : this.layerY
//            })
//        },
//        
//        
//        render : function () {
//            this.raphaelNode = this.getPaper().circle(this.layerX, this.layerY, 0)
//        },
//        
//        
//        refresh : function () {
//            
//            this.raphaelNode.attr({
//                r : this.element.radius
//            })
//        },
//        
//        
//        onExternalMouseMove : function (layerX, layerY) {
//            this.element.addPoint(layerX, layerY)
//            
//            this.refresh()
//        },
//        
//        
//        onExternalMouseUp : function (layerX, layerY) {
//        }
//    }
//})
