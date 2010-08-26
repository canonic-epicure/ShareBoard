Class('ShareBoard.Model.Board.Element', {
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        x               : { required : true },
        y               : { required : true },
        
        board           : { required : true }
    },
    
    
    methods : {
        
        
    }
    
})
