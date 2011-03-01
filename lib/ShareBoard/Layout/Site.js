Class('ShareBoard.Layout.Site', {
    
    isa             : Ext.Container,
    
    
    use : [ 'ShareBoard.Widget.Header', 'ShareBoard.Widget.Footer', 'ExtX.Layout.NBSP', 'ExtX.Layout.CenterHorizontally' ],
    
    
    has : {
        slots                   : true,
        
        autoWidth               : true,
        autoHeight              : true
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                style : 'position : relative',
                
                items : [
                    {
                        xtype   : 'container',
                        
                        cls     : 'ShareBoard-Content-Header',
                        
                        layout  : 'center-h',
                        
                        items   : [
                            {
                                xtype   : 'ShareBoard.Widget.Header',
                                slot    : 'header',
                                
                                cls     : 'ShareBoard-Content',
                                
                                height  : 50
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        cls : 'ShareBoard-Content-Center',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype   : 'container',
                                slot    : 'center',
                                
                                cls     : 'ShareBoard-Content',
                                
                                layout  : 'card'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        cls : 'ShareBoard-Content-Footer',
                        
                        items : [
                            {
                                xtype   : 'ShareBoard.Widget.Footer',
                                
                                cls     : 'ShareBoard-Content'
                            }
                        ]
                    }
                ]
            })
            
            this.on('currentPage', this.onCurrentPageReport, this)
        }
    },
    
    
    methods : {
        
        onCurrentPageReport : function (page) {
            var header = this.slots.header
            
            header.setActivePage.defer(100, header, [ page.pageId ])
        },
        
        
        touch : function () {
//            Ext.getBody().addClass('grayed')
        }
    }
})

