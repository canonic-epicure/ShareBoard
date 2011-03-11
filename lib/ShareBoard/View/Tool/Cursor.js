Class('ShareBoard.View.Tool.Cursor', {
    
    isa     : 'ShareBoard.View.Tool',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseMove', 'MouseOut', 'MouseOver' ] 
        }
    },
    
    
    methods : {
        
        activate : function () {
            var me = this
            
            var boardWidget = this.boardWidget
            
            Joose.A.each(this.trackEvents, function (eventName) {
                var eventname = eventName.toLowerCase()
                
                var methodName = 'on' + eventName
                
                if (!me.meta.hasMethod(methodName)) throw "Can't track mouse event [" + eventName + "] - no such method: [" + methodName + "]"
                
                boardWidget.body.on(eventname, me[ methodName ], me)
            })
        },
        
        
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
