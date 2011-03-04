Class('ShareBoard.Model.User', {
    
    does         : [
        'Syncler.Object',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
        nickName        : 'Guest'
    },
    
    
    methods : {
        
//        getBubbleTarget : function () {
//            return this.board
//        }
    }
    
})
