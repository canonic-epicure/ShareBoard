Class('ShareBoard.Model.User', {
    
    does         : [
        'Syncler.Object',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
        nickName        : 'Guest',
        
        host            : null
    },
    
    
    methods : {
        
        getBubbleTarget : function () {
            return this.host
        }
    }
    
})
