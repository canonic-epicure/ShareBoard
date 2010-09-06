Class('ShareBoard.Model.User', {
    
    trait       : 'Syncler.Hub',
    
    does         : [ 
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
        nickName        : null,
        
        email           : null,
        
        passwordHash    : null,
        
        authToken       : null
    },
    
    
    methods : {
        
        authorize : function () {
        },
        
        
        isAuthorized    : function () {
        },
        
        
        getChannelName  : function () {
            return '/user/' + this.uuid
        }
    }
    
})
