Class('ShareBoard.Board.Element.Path', {
    
//    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        elements        : Joose.I.Array
    },
    
    
    methods : {
        
        addUser : function () {
        }
    }
})
