Class('ShareBoard.Widget.Home', {
    
    isa : 'Symbie.Widget.Container',
    

    use : 'ShareBoard.Widget.Board',
    
    has : {
    },
    
    
    before : {
        
        initComponent : function () {
            
            
            Ext.apply(this, {
                
                height : 800,
                
                
                items : [
                    {
                        xtype : 'ShareBoard.Widget.Board'
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
