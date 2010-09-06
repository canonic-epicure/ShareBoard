Class('ShareBoard.Model.Board.View', {
    
    does         : [ 
        'KiokuJS.Feature.Class.OwnID'
    ],
    
    
    trait       : 'Syncler.Vero',
    
    
    vero : {
        owner           : { required : true },
        createdAt       : Joose.I.Now,
        
        
        phantomOpacity  : 0.2,
        phantomDashing  : "- ",
        phantomColor    : 'green',
        phantomWidth    : 2,
        
        currentColor    : 'blue',
        currentDashing  : '',
        currentWidth    : 2,
        
        width           : null,
        height          : null
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        acquireID : function () {
            return this.uuid
        }
    }
})
