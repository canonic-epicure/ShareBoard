Class('ShareBoard.Model.Board.Element', {
    
    does         : [
        'Syncler.Object',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
        board           : { required : true },
        
        x               : { required : true },
        y               : { required : true },
        
        widgetClass     : null,
        
        color           : 'blue',
        scale           : 1,
        rotation        : 0,
        
        status          : 'draft'
    }
    
//    ,
//    
//    
//    methods : {
//        
//        initialize : function () {
//        },
//        
//        
//        sketch : function () {
//        },
//        
//        
//        put : function () {
//        },
//        
//        
//        cancel : function () {
//        }
//    }
    
})

