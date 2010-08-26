Class('ShareBoard.Model.Board.Element', {
    
//    isa         : Ext.util.Observable,
//    
//    meta        : Joose.Meta.Class,
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        x               : { required : true },
        y               : { required : true },
        
        board           : { required : true }
    },
    
    
    methods : {
        
//        initialize : function () {
//            
//            this.addEvents('create', 'update')
//        }
    }
    
})
