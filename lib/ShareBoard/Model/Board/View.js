Class('ShareBoard.Model.Board.View', {
    
    does       : [
        'Syncler.Object',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    has : {
        draftOpacity    : 0.2,
        draftDashing    : '- ',
        draftColor      : 'green',
        draftWidth      : 2,
        
        elementOpacity  : 1,
        elementDashing  : '',
        elementColor    : 'blue',
        elementWidth    : 2,
        
        width           : null,
        height          : null
    }
})
