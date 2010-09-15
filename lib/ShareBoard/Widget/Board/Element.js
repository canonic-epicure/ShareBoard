Class('ShareBoard.Widget.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    does    : 'ShareBoard.Widget.Role.LocalEvent',
    
    
    has : {
        boardWidget     : { required : true },
        
        board           : { required : true },
        
        model           : { required : true },
        
        uuid            : null,
        
        raphael         : null
    },
    
    
    methods : {
        
        initialize : function () {
            var model       = this.model
            
            this.uuid       = model.uuid
        },
        
        
        render : function () {
            
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        onMutate : function (channel, object, packet) {
        }
    }
})
