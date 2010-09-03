Class('ShareBoard.Model.Board.Element', {
    
    trait       : 'Vero',
    
//    // XXX `does : JooseX.Observable`
//    isa         : Ext.util.Observable,
//    
//    meta        : Joose.Meta.Class,
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
//        lastMutatedAt   : null,
        
        x               : {
            trait       : Vero.Attribute,
            required    : true 
        },
        
        y               : { 
            trait       : Vero.Attribute,
            required    : true 
        },
        
        scale           : 1,
        rotation        : 0,
        
        board           : { required : true },
        
        status          : 'phantom',
        
        isShadow        : false,
        
        widgetClass     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('create', 'sketch', 'put', 'mutate')
            this.enableBubble('create', 'sketch', 'put', 'mutate')
        },
        
        
        getBubbleTarget : function () {
            return this.board
        },
        
        
        sketch : function () {
        },
        
        
        put : function () {
        },
        
        
        cancel : function () {
        }
        
    }
    
})

