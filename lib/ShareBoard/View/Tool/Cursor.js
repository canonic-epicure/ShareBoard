Class('ShareBoard.View.Tool.Cursor', {
    
    isa     : 'ShareBoard.View.Tool',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove', 'MouseOut', 'MouseOver' ] 
        },
        
        
        image   : null
    },
    
    
    methods : {
        
        onMouseDown : function () {
            if (this.image) this.image.attr({
                src : ShareBoard().pathToStatic('images/kolya.jpg')
            })
        },
        
        
        onMouseUp : function () {
            if (this.image) this.image.attr({
                src : ShareBoard().pathToStatic('images/samurai_jack.jpg')
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
                this.image = this.getPaper().image(ShareBoard().pathToStatic('images/samurai_jack.jpg'), x, y, 69, 80)
                
                return
            }
            
            
            this.image.attr({
                x : x,
                y : y
            })
        }
        
    }
})

ShareBoard.View.Tool.register('cursor', ShareBoard.View.Tool.Cursor)
