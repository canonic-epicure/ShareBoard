Class('ShareBoard.Board.Element', {
    
//    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        elements        : Joose.I.Array,
        
        createdAt       : Joose.I.Now,
        
        createdBy       : null
    },
    
    
    methods : {
        
        addUser : function () {
        }
    }
})
