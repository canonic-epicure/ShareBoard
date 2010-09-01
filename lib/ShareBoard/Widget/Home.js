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
            
            var board   = new ShareBoard.Model.Board()
            
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
                    {
                        xtype : 'ShareBoard.Widget.Board',
                        
                        board   : board,
                        
                        boardID : board.uuid
                    }
                ]
            })
        }
    },
            
            
    methods : {
        
        onNewBoard : function (button) {
            var newBoard = new ShareBoard.Model.Board()
            
            button.disable()
            
            ShareBoard().board = newBoard
            
            this.dispatch('/' + newBoard.uuid).ensure(function () {
                
                button.enable()
            }).now()
        }
    }
    
})
