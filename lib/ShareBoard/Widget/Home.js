Class('ShareBoard.Widget.Home', {
    
    isa : 'Symbie.Widget.Container',
    

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
                
                
                items : [
                    {
                        xtype   : 'ShareBoard.Widget.Board',
                        
                        board   : board
                    }
                ]
            })
        }
    },
    
    
    after : {
    },
            
            
    methods : {
    }
    
})
