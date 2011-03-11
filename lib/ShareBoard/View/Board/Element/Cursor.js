Class('ShareBoard.View.Board.Element.Cursor', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
        
        userNameEl      : null
    },

    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var cursor  = this.model
            
            var raphael     = this.raphael      = this.getPaper().image('lib/ShareBoard/static/images/cursor/color.png', cursor.x, cursor.y, 32, 32)
            var userNameEl  = this.userNameEl   = this.getPaper().text(cursor.x + 20, cursor.y - 5, cursor.belongsToUser.nickName)
            var node        = this.node         = Ext.get(raphael.node)
            
            if (cursor.visible) {
                raphael.attr({
                    opacity   : 1
                })
                
                userNameEl.attr({
                    opacity   : 1
                })
            } else {
                raphael.attr({
                    opacity   : 0
                })
                
                userNameEl.attr({
                    opacity   : 0
                })
            }
        },
        
        
        onAttributeMutate : function (object, mutation) {
            var cursor          = this.model
            var raphael         = this.raphael
            var userNameEl      = this.userNameEl
            
            if (mutation.attributeName == 'visible')
                
                if (cursor.visible) {
                    raphael.attr({
                        opacity   : 1
                    })
                    userNameEl.attr({
                        opacity   : 1
                    })
                } else {
                    raphael.attr({
                        opacity   : 0
                    })
                    userNameEl.attr({
                        opacity   : 0
                    })
                }
            else {
                raphael.attr({
                    x   : cursor.x,
                    y   : cursor.y
                })
                
                userNameEl.attr({
                    x   : cursor.x + 20,
                    y   : cursor.y - 5
                })
            }
            
            if (mutation.attributeName == 'text') userNameEl.node.childNodes[ 0 ].textContent = cursor.text
        }
    }
})
