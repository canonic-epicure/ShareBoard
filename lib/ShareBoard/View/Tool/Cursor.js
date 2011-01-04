Class('ShareBoard.View.Tool.Cursor', {
    
    isa     : 'ShareBoard.View.Tool',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseMove', 'MouseOut', 'MouseOver' ] 
        }
    },
    
    
    methods : {
        
        onMouseOver : function () {
            var cursor = this.getBoard().getOwnFlash().get('cursor')
            
            if (cursor && !cursor.visible) cursor.setVisible(true)
        },
        
        
        onMouseOut : function () {
            var cursor = this.getBoard().getOwnFlash().get('cursor')
            
            if (cursor && cursor.visible) cursor.setVisible(false)
        },
        
        
        onMouseMove : function (event) {
            var x = this.getLayerX(event)
            var y = this.getLayerY(event)
            
            var cursor = this.getBoard().getOwnFlash().get('cursor')
            
            if (cursor) {
                cursor.setX(x)
                cursor.setY(y)
            }
        }
        
    }
})

ShareBoard.View.Tool.register('cursor', ShareBoard.View.Tool.Cursor)
