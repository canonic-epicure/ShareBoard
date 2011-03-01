Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Container,
    
    use     : 'ShareBoard.View.Board',
    
    has : {
        board       : { required : true }
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                title           : 'ShareBoard',
                bodyCssClass    : 'ShareBoard-Board',
                
                layout          : 'border',
                
                items           : [
                    {
                        region      : 'center',
                        
                        xtype       : 'ShareBoard.View.Board',
                        
                        board       : this.board
                    },
                    {
                        region      : 'east',
                        
                        width       : 200,
                        
                        border      : false,
                        
                        title       : 'Settings',
                        collapsible : true
                    }
                ]
            })
        }
    }
})
