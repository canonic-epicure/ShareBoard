Class('ShareBoard.Widget.Board.Element', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        createdAt       : Joose.I.Now,
        
        createdBy       : null,
        
        
        isPressed       : false
    },
    
    
    methods : {
        
        
        onMouseDown : function (e) {
            this.isPressed  = true
        },
        
        
        onMouseUp : function (e) {
            this.isPressed  = false
        },
        
        
        onMouseMove : function (e) {
        },
        
        
        onMouseOut : function () {
        }
    }
    
})
