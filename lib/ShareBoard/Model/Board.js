Class('ShareBoard.Model.Board', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        uuid            : Joose.I.UUID,
        
        elements        : Joose.I.Array,
        elementsBy
        
        
        createdAt       : Joose.I.Now,
        createdBy       : null
    },
    
    
    methods : {
        
        addUser : function () {
        }
    }
})
