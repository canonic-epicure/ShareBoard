Class('ShareBoard.Widget.Home', {
    
    isa : Ext.Panel,
    
    does : 'Symbie.Widget',
    

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
                
                
                tbar : [
                    {
                        text    : 'New Board',
                        
                        scale   : 'large',
                        
                        handler : this.onNewBoard,
                        scope   : this
                    }
                ],
                
                layout : 'fit',
                
                
                items : [
//                    {
//                        xtype : 'ShareBoard.Widget.Board',
//                        
//                        board   : board,
//                        
//                        boardID : board.uuid
//                    }
                ]
            })
        }
    },
            
            
    methods : {
        
        onNewBoard : function (button) {
            
            var channel       = ShareBoard().syncler.createChannel()
            
            
            var board   = new ShareBoard.Model.Board({
                channel         : channel
            })
            
            
            button.disable()
            
            channel.establish({
                
                // topic           : board, // default - the first object
                // channelName     : '/ShareBoard/Model/Board/' + board.uuid // default
                
            }).then(function () {
                
                ShareBoard().board = board
                
                this.dispatch('/' + board.uuid).now()
                
            }).ensure(function () {
                
                button.enable()
                
            }).now()
            
            
        }
    }
    
})
