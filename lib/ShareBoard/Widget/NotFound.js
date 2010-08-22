Class('ShareBoard.Widget.NotFound', {
    
    isa             : 'SymbieX.Template.Shotenjin.Container',
    
    does            : 'Symbie.Widget',
    

    have : {
        templateSources         : {
            /*tj
                <div>Sorry, this page is missing</div>
                
                <div class="jit_nav_button"></div>
            tj*/
        },
        
        canvas                  : null,
        
        ignoreMouse             : false
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                cls : 'ShareBoard-Widget-NotFound',
                
                width : 500,
                height : 350,
                
                style : 'position : relative'
            })
        }
        //eof initComponent
    }
    
})