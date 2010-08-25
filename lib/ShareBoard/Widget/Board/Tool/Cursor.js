Class('ShareBoard.Widget.Board.Tool.Cursor', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackMouse      : [ 'Down', 'Up', 'Move' ]
    },
    
    
    methods : {
        
    }
})


ShareBoard.Widget.Board.Tool.register('cursor', ShareBoard.Widget.Board.Tool.Cursor)



//Class('ShareBoard.Widget.Board.Element.Cursor', {
//    
//    isa     : 'ShareBoard.Widget.Board.Element',
//    
//    
//    use     : 'ShareBoard.Model.Board.Element.Path',
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
//            return new ShareBoard.Model.Board.Element.Path({
//                board   : this.boardWidget.board,
//                
//                layerX  : this.layerX,
//                layerY  : this.layerY
//            })
//        },
//        
//        
//        render : function () {
//            this.raphaelNode = this.getPaper().path(this.element.getPath())
//        },
//        
//        
//        refresh : function () {
////            console.log('Path refreshed to: ' + this.element.getPath())
//            
//            this.raphaelNode.attr({
//                path : this.element.getPath()
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