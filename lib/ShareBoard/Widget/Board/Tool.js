Class('ShareBoard.Widget.Board.Tool', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    does    : 'ShareBoard.Widget.Role.LocalEvent',
    
    
    has : {
        boardWidget     : { required : true },
        
        trackEvents     : null
    },
    
    
    methods : {
        
        initialize : function () {
            
        },
        
        
        activate : function () {
            var me = this
            
            var boardWidget = this.boardWidget
            
            Joose.O.each(this.trackEvents, function (methodName, eventName) {
                
                if (!me.meta.hasMethod(methodName)) throw "Can't track mouse event [" + eventName + "] - no such method: [" + methodName + "]"
                
                boardWidget.on(eventName, me[ methodName ], me)
            })
        },
        
        
        deActivate : function () {
            var me = this
            
            var boardWidget = this.boardWidget
            
            Joose.O.each(this.trackEvents, function (methodName, eventName) {
                
                if (!me.meta.hasMethod(methodName)) throw "Can't untrack mouse event [" + eventName + "] - no such method: [" + methodName + "]"
                
                boardWidget.un(eventName, me[ methodName ], me)
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
