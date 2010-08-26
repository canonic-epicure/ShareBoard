Class('ShareBoard.Widget.NotFound', {
    
    isa             : 'SymbieX.Template.Shotenjin.Panel',
    
    does            : 'Symbie.Widget',
    

    have : {
        templateSources         : {
            /*tj
                <div>Sorry, this page is missing</div>
            tj*/
        },
        
        canvas                  : null,
        
        ignoreMouse             : false
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                title   : '404 - Page Not Found',
                
                cls : 'ShareBoard-Widget-NotFound',
                
                width : 500,
                height : 350,
                
                style : 'position : relative'
            })
        }
        //eof initComponent
    }
    
})