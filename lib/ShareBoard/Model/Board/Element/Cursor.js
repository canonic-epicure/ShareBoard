Class('ShareBoard.Model.Board.Element.Cursor', {
    
    isa     : 'ShareBoard.Model.Board.Element',
    
    has : {
        belongsToUser   : { required : true },
        
        text            : null,
        
        visible         : false,
        
        imageSrc        : null,
        widgetClass     : 'ShareBoard.View.Board.Element.Cursor'
    },
    
    
    after : {
        
        initialize : function () {
            
            this.belongsToUser.on('/mutation/commit/**', function () {
                
                this.setText(this.belongsToUser.nickName)
            
            }, this)
        }
    }
})
