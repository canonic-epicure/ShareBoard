Class('ShareBoard.Model.Board', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        elements        : Joose.I.Array
    },
    
    
    methods : {
        
        addUser : function () {
        }
    }
})
