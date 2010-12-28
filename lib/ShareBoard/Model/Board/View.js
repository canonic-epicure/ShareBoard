Class('ShareBoard.Model.Board.View', {
    
    does       : [
        'Syncler.Object'
//        ,
//        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    has : {
        phantomOpacity  : 0.2,
        phantomDashing  : '- ',
        phantomColor    : 'green',
        phantomWidth    : 2,
        
        currentOpacity  : 0.2,
        currentDashing  : '',
        currentColor    : 'blue',
        currentWidth    : 2,
        
        width           : null,
        height          : null
    }
    
//    ,
//    
//    
//    methods : {
//        
//        initialize : function () {
//        }
//    }
})
