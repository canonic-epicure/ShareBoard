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
            
            model.on('sketch',  this.onSketch, this)
            model.on('put',     this.onPut, this)
            model.on('mutate',  this.onPut, this)
        },
        
        
        render : function () {
            
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        onSketch : function () {
        },
        
        
        onPut : function () {
        },
        
        
        onMutate : function () {
        }
    }
})
