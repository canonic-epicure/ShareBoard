Class('ShareBoard', {
    
    isa         : 'Symbie.Application',

    trait       : 'JooseX.Class.Singleton',
    
    plugins     : [
        'SymbieX.History',
        'SymbieX.ExtJS.Widget',
        'SymbieX.ExtJS.DomReady',
        'SymbieX.ExtJS.Shotenjin',
        'SymbieX.ExtJS.DispatchMask'
    ],
    
    use : [
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        },
        
        'ShareBoard.Widget.Root',
        'ShareBoard.Layout.Site',
        
        'KiokuJS.Backend.Hash',
        'KiokuJS.Backend.Batch',
        'Syncler.Client'
    ],
    
    
    
    has : {
//        staticPrefix        : '../../lib/ShareBoard/static/',
//        
        replica             : null,
        
        board               : null,
        replica             : null
    },
    
    
    after : {
        initialize : function () {
            this.on('dispatchException', this.onDispatchException, this)
            
            this.replica = new KiokuJS.Backend.Hash({
                
                traits          : [ Syncler.Client, KiokuJS.Backend.Batch ],
                
                baseURL         : 'http://local/8080',
                socket          : new Socket.Client('/8080/faye')
            })
        }
    },
    
    
    methods : {
        
        ACTIVATE : function (c) {
            var root = c.stash.root = this.root
        },
        
        
        FINALIZE : function (c) {
            var root = c.stash.root
            
            root.doLayout()
        },
        
        
        onDomReady : function () {
            this.root = new ShareBoard.Widget.Root({
                app   : this
            })
        },
        
        
//        pathToStatic : function (file) {
//            return this.staticPrefix.replace(/\/?$/, '') + '/' + file.replace(/^\/?/, '')
//        },
//        
//        
//        hasBoard    : function () {
//            return this.board != null
//        },
        
        
        onDispatchException : function (router, exception) {
            
            Ext.Msg.show({
               title    : 'Error:',
               msg      : exception,
               
               buttons  : Ext.Msg.OK,
               icon     : Ext.MessageBox.ERROR
            })
            
            return false
        },
        
        
        createMainLayout : function (c) {
            var root = c.stash.root
            
            root.activate(c, {
                xtype   : 'ShareBoard.Layout.Site',
                
                slot    : 'mainLayout'
            })
            
            return root.slots.mainLayout
        },
        
        
        createBoard : function (c, board) {
            var layout = this.createMainLayout(c)
            
            return layout.slots.center.activate(c, {
                xtype   : 'ShareBoard.Widget.Board',
                
                board   : board
            })
        }
    },
    
    
    routes : {
        
        '/' : function (c) {
            c.call('/home').now()
        },
        
        
        '/home' : {
            
            use         : [ 'ShareBoard.Widget.Home' ],
            
            action      : function (c) {
                var layout = this.createMainLayout(c)
                
                layout.slots.center.activate(c, {
                    xtype       : 'ShareBoard.Widget.Home'   
                })
                
                this.CONTINUE()
            } 
        },
        
        
        
        
        '/:boardID' : {
            
            use     : [ 'ShareBoard.Widget.Board' ],
            
            where   : {
                boardID    : /^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/
            },
            
            action : function (c, boardID) {
                
                var app = c.app()
                
                if (!app.board || app.board.uuid != boardID) {

                    app.replica.setupChannel({ topicID : boardID }).andThen(function (replica) {
                        
                        app.replica     = replica
                        app.board       = replica.getTopic()
                        
                        this.createBoard(c, app.board)
                        
                        this.CONTINUE()
                        
                    }, this)
                    
                    return
                }
                
                this.createBoard(c, app.board)
                
                this.CONTINUE()
            } 
        },
        
        
        '/*' : {
            use     : 'ShareBoard.Widget.NotFound',
            
            action  : function (c) {
                var root = c.stash.root
                
                root.activate(c, { 
                    xtype       : 'ShareBoard.Widget.NotFound'
                })
                
                this.CONTINUE()
            }
        }
    }
    // eof routes
})



