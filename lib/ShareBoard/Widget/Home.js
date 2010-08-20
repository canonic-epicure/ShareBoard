Class('ShareBoard.Widget.Home', {
    
    isa : Ext.Panel,
    
    
    does : 'Symbie.Widget',
    
    
    has : {
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                title : 'yo',
                
                height : 800,
                
                tbar : [
                    {
                        text : 'Line'
                    },
                    {
                        text : 'Circle'
                    },
                    {
                        text : 'Ellipse'
                    }
                ]
            })
        }
    },
    
    
    methods : {
        
    }
    
})