Class('ShareBoard.View.Board.Element', {
    
    does    : [
        'JooseX.Observable',
        'ShareBoard.Role.LocalEvent'
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
            
            this.model.on('mutation-attribute', this.onAttributeMutate, this)
        },
        
        
        getBoard : function () {
            return this.boardWidget.board
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        render : function () {
            throw "Abstract method called"
        },
        
        
        onAttributeMutate : function (object, attrName, value, hasOldValue, oldValue) {
            throw "Abstract method called"
        }
    }
})

