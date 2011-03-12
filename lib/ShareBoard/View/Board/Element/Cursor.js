Class('ShareBoard.View.Board.Element.Cursor', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
        userNameEl      : null
    },

    
    methods : {
        
        updatePosition : function () {
            var cursor          = this.model
            var raphael         = this.raphael
            var userNameEl      = this.userNameEl
            
            raphael.attr({
                x   : cursor.x,
                y   : cursor.y
            })
            
            userNameEl.attr({
                x   : cursor.x + 20,
                y   : cursor.y - 5
            })
        },
        
        
        updateStyle : function () {
            var cursor          = this.model
            var raphael         = this.raphael
            var userNameEl      = this.userNameEl
            
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
            
            var attributeName       = mutation.attributeName
            var cursor              = this.model
            
            if (attributeName == 'visible')    
                this.updateStyle()
            else
                if (attributeName == 'text')       
                    this.userNameEl.node.childNodes[ 0 ].textContent = cursor.text
                else
                    this.updatePosition()
        }
    },
    
    
    augment : {
        
        render : function () {
            var cursor          = this.model
            
            this.raphael        = this.getPaper().image('lib/ShareBoard/static/images/cursor/color.png', cursor.x, cursor.y, 32, 32)
            this.userNameEl     = this.getPaper().text(cursor.x + 20, cursor.y - 5, cursor.belongsToUser.nickName)
            
            this.INNER()
        }
    }
})
