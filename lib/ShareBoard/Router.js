Class('ShareBoard.Router', {
    
    isa : 'Symbie.Router',
    
    does : [ 'SymbieX.History.Router', 'SymbieX.Template.Shotenjin.Router' ],
    
    routes : {
        
        mainLayout : {
            via : function (context, root) {
                var layout = root.findOrCreate('ShareBoard.Layout.Site')
                
                layout.slotAndMark('center')
            }
        },
        
        
        home : {
            mapTo : '/home',
            
            via : function (context, root) {
                root.collectFrom('mainLayout')
                
                context.getMark('center').findOrCreate('ShareBoard.Widget.Home')
            } 
        },
        
        
        index : {
            mapTo : '/',
            
            via : function (context, root) {
                root.collectFrom('home')
            }
        },
        
        
        'default' : {
            mapTo : '/*',
            
            via : function (context, root) {
                root.findOrCreate('ShareBoard.Layout.Centered').findOrCreate('ShareBoard.Widget.NotFound')
            }
        }
    },
    //eof routes
    
    
    after : {
        initialize : function () {
            this.on('dispatchException', this.onDispatchException, this)
        }
    },
    
    
    methods : {
        
        onDispatchException : function (router, exception) {
            
            Ext.Msg.show({
               title    : 'Error:',
               msg      : exception,
               
               buttons  : Ext.Msg.OK,
               icon     : Ext.MessageBox.ERROR
            })
            
            return false
        }
    },
    
    
    continued : {
    
        override : {
            
            dispatch : function () {
                
                Ext.getBody().mask()
                
                this.SUPERARG(arguments).ensure(function () {
                    
                    Ext.getBody().unmask()
                    
                    this.CONTINUE()
                    
                }).now()
            }
            
        }
    }
    
})
