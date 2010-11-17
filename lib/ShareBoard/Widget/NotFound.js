// XXX add 'setActiveItem' to ExtX.Layout.CenterBoth

Class('ShareBoard.Widget.NotFound', {
    
    isa     : Ext.Container,
    
    use     : [ 'ExtX.Layout.CenterBoth' ],
    

    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                layout : 'center-both',
                
                items : [
                    {
                        xtype : 'panel',
                        
                        width : 500,
                        height : 330,
                        
                        title : 'Sorry, this page is missed',
                        
                        bodyCssClass : 'demoapp-not-found-body',
                        
                        buttons : [
                            {
                                text : 'Go back',
                                
                                handler : function () {
                                    history.go(-1)
                                }
                            }
                        ],
                        
                        buttonAlign : 'center'
                    }                        
                ]
            })
        }
        //eof initComponent
    }
    
})
