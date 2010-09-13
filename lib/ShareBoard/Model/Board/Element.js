Class('ShareBoard.Model.Board.Element', {
    
    trait       : 'Syncler.Node',
    
    does         : [ 
        'KiokuJS.Feature.Class.OwnUUID'
//        'JooseX.Observable', //?
    ],
    
    
    
    has : {
        createdAt       : Joose.I.Now,
//        owner           : { required : true },
        
        board           : { required : true },
        widgetClass     : null
    },
        
    
    vero : {  
        x               : {
            required    : true 
        },
        
        y               : { 
            required    : true 
        },
        
        scale           : 1,
        rotation        : 0,
        
        status          : 'draft'
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        getHub : function () {
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

