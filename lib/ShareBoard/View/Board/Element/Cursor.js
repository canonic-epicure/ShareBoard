Class('ShareBoard.View.Board.Element.Cursor', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var cursor  = this.model
            
            var raphael = this.raphael  = this.getPaper().image('lib/ShareBoard/static/images/cursor/gray.png', cursor.x, cursor.y)
            var node    = this.node     = Ext.get(raphael.node)
        },
        
        
        onAttributeMutate : function (object, mutation) {
            var cursor          = this.model
            var raphael         = this.raphael
            
            if (mutation.attributeName == 'visible')
                
                if (mutation.newValue == false)
                    raphael.attr({
                        opacity   : 0
                    })
                else
                    raphael.attr({
                        opacity   : 1
                    })
            else
                raphael.attr({
                    x   : cursor.x,
                    y   : cursor.y
                })
        }
    }
})
