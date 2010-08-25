Class('ShareBoard.Model.Board.DrawStep', {
    
    use     : 'Data.UUID',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        sequencePos     : null,
        
        board           : { required : true },
        
        layerX          : null,
        layerY          : null
    },
    
    
    methods : {
        
        
    }
    
})
