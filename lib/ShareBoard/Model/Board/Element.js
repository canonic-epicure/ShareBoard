Class('ShareBoard.Model.Board.Element', {
    
    // XXX JooseX.Observable
    isa         : Ext.util.Observable,
    
    meta        : Joose.Meta.Class,
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        x               : { required : true },
        y               : { required : true },
        
        board           : { required : true }
    },
    
    
    methods : {
        
        initialize : function () {
            
            this.addEvents('create', 'mutate')
        }
    }
    
})
