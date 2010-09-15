Class('ShareBoard.Widget.Home', {
    
    isa     : Ext.Panel,
    
    does    : 'Symbie.Widget',
    

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
//                ,
//                
////                layout : 'fit',
//                
//                
//                items : [
////                    {
////                        xtype : 'ShareBoard.Widget.Board',
////                        
////                        board   : board,
////                        
////                        boardID : board.uuid
////                    }
//                ]
            })
        }
    },
            
            
    methods : {
        
        onNewBoard : function (button) {
            
            var channel         = ShareBoard().syncler.createChannel()
            
            var board           = new ShareBoard.Model.Board({
                channel         : channel
            })
            
            
            button.disable()
            
            channel.establish().then(function () {
                
                ShareBoard().board      = board
                ShareBoard().channel    = channel
                
                this.dispatch('/' + board.uuid).now()
                
            }, this).ensure(function () {
                
                button.enable()
                
                this.CONTINUE()
                
            }).now()
            
            
        }
    }
    
})
