Class('ShareBoard.Model.Board.Element', {
    
    trait       : 'Syncler.Vero.Meta',
    
    does         : [
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
//        createdAt       : Joose.I.Now,
//        owner           : { required : true },
        
        board           : { required : true },
        widgetClass     : null
    },
        
    
    sync : {  
        x               : { required : true },
        y               : { required : true },
        
        color           : 'blue',
        scale           : 1,
        rotation        : 0,
        
        status          : 'draft'
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        sketch : function () {
        },
        
        
        put : function () {
        },
        
        
        cancel : function () {
        }
    }
    
})

