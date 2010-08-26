Class('ShareBoard.Widget.Board.Tool.Cursor', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove', 'MouseOut', 'MouseOver' ] 
        },
        
        
        image   : null
    },
    
    
    methods : {
        
        onMouseDown : function () {
            if (this.image) this.image.attr({
                src : '../../lib/ShareBoard/static/images/kolya.jpg'
            })
        },
        
        
        onMouseUp : function () {
            if (this.image) this.image.attr({
                src : '../../lib/ShareBoard/static/images/samurai_jack.jpg'
            })
        },
        
        
        onMouseOver : function () {
            if (this.image) this.image.show()
        },
        
        
        onMouseOut : function () {
            if (this.image) this.image.hide()
        },
        
        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            

            if (!this.image) {
                this.image = this.getPaper().image('../../lib/ShareBoard/static/images/samurai_jack.jpg', x, y, 69, 80)
                
                return
            }
            
            
            this.image.attr({
                x : x,
                y : y
            })
        }
        
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
