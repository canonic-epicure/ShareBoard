Class('ShareBoard.Layout.Site', {
    
    isa             : 'Symbie.Widget.Container',
    
    
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
                        
                        cls : 'JooseIt-Content-Header',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'ShareBoard.Widget.Header',
                                slot : 'header',
                                
                                width : 990,
                                
                                height : 360
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        cls : 'JooseIt-Content-Center',
                        
                        layout : 'center-h',
                        
                        items : [
                            {
                                xtype : 'container',
                                slot : 'center',
                                
                                cls : 'JooseIt-Content',
                                
                                layout : 'card'
                            }
                        ]
                    },
                    {
                        xtype : 'container',
                        
                        layout : 'center-h',
                        
                        cls : 'JooseIt-Content-Footer',
                        
                        items : [
                            {
                                xtype : 'ShareBoard.Widget.Footer',
                                
                                cls : 'JooseIt-Content'
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
    },
    
    
    after : {
        onRender : function () {
            var wrapper = Ext.get(document.createElement('div'))
            
            wrapper.update('<a href="http://github.com/Joose/Joose" alt="Fork me on GitHub"><div class="JooseIt-GitHub"></div></a>')
            
            this.el.appendChild(wrapper.child('a'))
        }
    }
    
})

