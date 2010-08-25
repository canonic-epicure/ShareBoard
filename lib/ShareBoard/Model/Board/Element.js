Class('ShareBoard.Model.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    use     : 'Data.UUID',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        board           : { required : true },
        
        layerX          : { required : true },
        layerY          : { required : true }
    },
    
    
    methods : {
        
        
    }
    
})
