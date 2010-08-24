Class('ShareBoard.Model.Board.Element', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        
        createdBy       : null
    },
    
    
    methods : {
        
        
    }
    
})
