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
                        xtype : 'container',
                        
                        cls : 'ShareBoard-Content-Header',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'ShareBoard.Widget.Header',
                                slot : 'header',
                                
                                width : 990,
                                
                                height : 120
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        cls : 'ShareBoard-Content-Center',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'container',
                                slot : 'center',
                                
                                cls : 'ShareBoard-Content',
                                
                                layout : 'card'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        cls : 'ShareBoard-Content-Footer',
                        
                        items : [
                            {
                                xtype : 'ShareBoard.Widget.Footer',
                                
                                cls : 'ShareBoard-Content'
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
            Ext.getBody().addClass('grayed')
        }
    }
    
//    ,
//    after : {
//        onRender : function () {
//            var wrapper = Ext.get(document.createElement('div'))
//            
//            wrapper.update('<a href="http://github.com/Joose/Joose" alt="Fork me on GitHub"><div class="ShareBoard-GitHub"></div></a>')
//            
//            this.el.appendChild(wrapper.child('a'))
//        }
//    }
    
})

