Class('ShareBoard.Widget.Board.Tool', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    does    : 'ShareBoard.Widget.Role.LocalEvent',
    
    
    has : {
        boardWidget     : { required : true },
        
        trackMouse      : null
    },
    
    
    methods : {
        
        initialize : function () {
            
        },
        
        
        activate : function () {
            var me = this
            
            var boardWidget = this.boardWidget
            
            Joose.A.each(this.trackMouse, function (eventName) {
                var eventname = eventName.toLowerCase()
                
                var methodName = 'onMouse' + eventName
                
                if (!me.meta.hasMethod(methodName)) throw "Can't track mouse event [" + eventName + "] - no such method: [" + methodName + "]"
                
                boardWidget.on(lowerCased, me[ methodName ], me)
            })
        },
        
        
        deActivate : function () {
            var me = this
            
            var boardWidget = this.boardWidget
            
            Joose.A.each(this.trackMouse, function (eventName) {
                var eventname = eventName.toLowerCase()
                
                var methodName = 'onMouse' + eventName
                
                if (!me.meta.hasMethod(methodName)) throw "Can't untrack mouse event [" + eventName + "] - no such method: [" + methodName + "]"
                
                boardWidget.un(lowerCased, me[ methodName ], me)
            })
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        }
    },
    
    
    my : {
        
        has : {
            registry    : Joose.I.Object
        },
        
        
        methods : {
            
            each : function (func, scope) {
                return Joose.O.each(this.registry, func, scope)
            },
            
            register : function (id, toolClass) {
                
                this.registry[ id ] = toolClass
            }
        }
    }
})
