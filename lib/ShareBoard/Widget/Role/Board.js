Role('ShareBoard.Widget.Role.LocalEvent', {
    
    methods : {
        
        getLayerX : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetX || extjsEvent.browserEvent.layerX
        },
        
        
        getLayerY : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetY || extjsEvent.browserEvent.layerY
        }
    }
    
})