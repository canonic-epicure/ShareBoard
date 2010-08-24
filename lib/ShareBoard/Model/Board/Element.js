Class('ShareBoard.Model.Board.Element', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        createdAt       : Joose.I.Now,
        
        createdBy       : null
    },
    
    
    methods : {
        
        addUser : function () {
        }
    }
})
