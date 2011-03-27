Role('ShareBoard.Role.LocalEvent', {
    
    has : {
        relativeTo      : null
    },
    
    
    methods : {
        
        getLayerX : function (extjsEvent) {
            return extjsEvent.getPageX() - Ext.fly(this.relativeTo).getX()
        },
        
        
        getLayerY : function (extjsEvent) {
            return extjsEvent.getPageY() - Ext.fly(this.relativeTo).getY()
        }
    }
    
})