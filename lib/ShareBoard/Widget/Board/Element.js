Class('ShareBoard.Widget.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    does    : 'ShareBoard.Widget.Role.LocalEvent',
    
    
    has : {
        boardWidget     : { required : true },
        
        board           : { required : true },
        
        model           : { required : true },
        
        dom             : null
    },
    
    
    methods : {
        
        initialize : function () {
            
        },
        
        
        render : function () {
            
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        }
    }
})
