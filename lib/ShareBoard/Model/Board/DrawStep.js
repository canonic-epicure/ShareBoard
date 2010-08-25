Class('ShareBoard.Model.Board.DrawStep', {
    
    use     : 'Data.UUID',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        sequencePos     : null,
        
        tool            : null,
        action          : null,
        data            : null
    },
    
    
    methods : {
        
        
    }
    
})


