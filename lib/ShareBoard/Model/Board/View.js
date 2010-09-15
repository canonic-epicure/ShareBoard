Class('ShareBoard.Model.Board.View', {
    
    trait       : 'Syncler.Vero.Meta',
    
    
    sync : {
//        owner           : { required : true },
//        createdAt       : Joose.I.Now,
        
        
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
        }
    }
})
