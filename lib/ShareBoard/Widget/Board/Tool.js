Class('ShareBoard.Widget.Board.Tool', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    has : {
        boardWidget     : { required : true }
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        activate : function () {
            
        },
        
        
        deActivate : function () {
        },
        
        
        onMouseDown : function (e) {
        },
        
        
        onMouseUp : function (e) {
        },
        
        
        onMouseMove : function (e) {
        },
        
        
        onMouseOver : function (e) {
        },
        
        
        onMouseOut : function (e) {
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        }
    }
    
})
