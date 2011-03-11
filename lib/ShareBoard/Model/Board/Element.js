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
        
        dashing         : '',
        width           : 2,
        color           : 'blue',
        scale           : 1,
        rotation        : 0,
        
        status          : 'draft'
    },
    
    
    methods : {
        
        getBubbleTarget : function () {
            return this.board
        },
        
        
        remove : function () {
            this.board.remove(this)
        }
    }
})

