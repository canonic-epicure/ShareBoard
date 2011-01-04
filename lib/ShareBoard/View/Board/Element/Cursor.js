Class('ShareBoard.View.Board.Element.Cursor', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var cursor  = this.model
            
            var raphael = this.raphael  = this.getPaper().image('lib/ShareBoard/static/images/cursor/gray.png', cursor.x, cursor.y, 128, 128)
            var node    = this.node     = Ext.get(raphael.node)
            
            if (cursor.visible)
                raphael.attr({
                    opacity   : 1
                })
            else
                raphael.attr({
                    opacity   : 0
                })
        },
        
        
        onAttributeMutate : function (object, mutation) {
            var cursor          = this.model
            var raphael         = this.raphael
            
            if (mutation.attributeName == 'visible')
                
                if (cursor.visible)
                    raphael.attr({
                        opacity   : 1
                    })
                else
                    raphael.attr({
                        opacity   : 0
                    })
            else
                raphael.attr({
                    x   : cursor.x,
                    y   : cursor.y
                })
        }
    }
})
