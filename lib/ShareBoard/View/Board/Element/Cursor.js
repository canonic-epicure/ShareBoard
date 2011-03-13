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
                
                raphael.node.style.display      = 'block'
                userNameEl.node.style.display   = 'block'
                
            } else {
                
                raphael.node.style.display      = 'none'
                userNameEl.node.style.display   = 'none'
            }
        },
        
        
        onAttributeMutate : function (object, mutation) {
            
            var attributeName       = mutation.attributeName
            var cursor              = this.model
            
            if (attributeName == 'text')       
                this.userNameEl.node.childNodes[ 0 ].textContent = cursor.text
            else
                this.SUPERARG(arguments)
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
