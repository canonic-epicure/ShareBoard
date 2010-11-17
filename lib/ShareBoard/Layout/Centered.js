Class('ShareBoard.Layout.Centered', {
    
    isa             : Ext.Container,
    
    use             : [ 'ExtX.Layout.CenterBoth' ],
    

    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'center-both'
            })
        }
        //eof initComponent
    },
    
    
    methods : {
        
        touch : function () {
            Ext.getBody().removeClass('grayed')
        }
    }
    
    
})