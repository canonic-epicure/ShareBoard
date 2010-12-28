Class('ShareBoard.Widget.Home', {
    
    isa     : Ext.Panel,
    
    use : [
        'ShareBoard.Widget.Board',
        'ShareBoard.Model.Board'
    ],
    
    
    has : {
        
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                height : 800,
                
                title   : 'Home widget',
                
                tbar : [
                    {
                        text    : 'New Board',
                        
                        scale   : 'large',
                        
                        handler : this.onNewBoard,
                        scope   : this
                    }
                ]
            })
        }
    },
            
            
    methods : {
        
        onNewBoard : function (button) {
            
            var replica         = ShareBoard().replica.newChannel()
            
            var board           = new ShareBoard.Model.Board({
                replica         : replica
            })
            
            
            button.disable()
            
            replica.setup({ topic : board }).then(function () {
                
                ShareBoard().board      = board
                ShareBoard().replica    = replica
                
                ShareBoard().dispatch('/' + board.uuid).now()
                
            }).ensure(function () {
                
                button.enable()
                
                this.CONTINUE()
                
            }).now()
        }
    }
    
})
