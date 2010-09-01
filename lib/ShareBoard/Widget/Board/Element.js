Class('ShareBoard.Widget.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    does    : 'ShareBoard.Widget.Role.LocalEvent',
    
    
    has : {
        boardWidget     : { required : true },
        
        board           : { required : true },
        
        model           : { required : true },
        
        uuid            : {},
        
        raphael         : null
    },
    
    
    methods : {
        
        initialize : function () {
            var model       = this.model
            
            this.uuid       = model.uuid
            
            model.on('mutate',  this.onMutate, this)
        },
        
        
        render : function () {
            
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        onMutate : function () {
        }
    }
})
