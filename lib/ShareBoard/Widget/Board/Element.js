Class('ShareBoard.Widget.Board.Element', {
    
    does    : [
        'JooseX.Observable',
        'ShareBoard.Widget.Role.LocalEvent'
    ],
    
    
    has : {
        boardWidget     : { required : true },
        
        model           : { required : true },
        
        uuid            : null,
        
        raphael         : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.uuid       = this.model.uuid
        },
        
        
        getBoard : function () {
            return this.boardWidget.board
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        render : function () {
            
        },
        
        
        onMutate : function (object, value, packet) {
        }
    }
})
