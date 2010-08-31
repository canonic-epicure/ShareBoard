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
                
                height : 300,
                
                
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
            var newBoard = new ShareBoard.Model.Board()
            
            button.disable()
            
            ShareBoard().board = newBoard
            
            this.dispatch('/' + newBoard.uuid).ensure(function () {
                
                button.enable()
            }).now()
        }
    }
    
})
