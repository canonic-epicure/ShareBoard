Class('ShareBoard', {
    
    isa         : 'Symbie.Application',

    trait       : 'JooseX.Class.Singleton',
    
    plugins     : [
        'SymbieX.History',
        'SymbieX.ExtJS.Widget',
        'SymbieX.ExtJS.DomReady',
        'SymbieX.ExtJS.Links',
        'SymbieX.ExtJS.DispatchMask'
    ],
    
    use : [
        
        'ShareBoard.Widget.Root',
        'ShareBoard.Layout.Site',
        
        'KiokuJS.Backend.Hash',
        'KiokuJS.Backend.Batch',
        'Syncler.Client'
    ],
    
    
    
    has : {
        syncler             : null,
        
        boards              : Joose.I.Object
    },
    
    
    after : {
        initialize : function () {
//            this.on('dispatchException', this.onDispatchException, this)
            
            this.syncler = new KiokuJS.Backend.Hash({
                
                traits          : [ Syncler.Client, KiokuJS.Backend.Batch ],
                
                baseURL         : 'http://shareboard.dev/8080',
                host            : 'shareboard.dev',
                port            : 8080
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
        
        
        addBoard    : function (board) {
            this.boards[ board.getTopicID() ] = board
        },
        
        
        hasBoard    : function (id) {
            return this.boards[ id ] != null
        },
        
        
        getBoard    : function (id) {
            return this.boards[ id ]
        },
        
        
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
            
            return this.root.activate(c, {
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
                
                if (!this.hasBoard(boardID)) {

                    this.syncler.setupReplica({ topicID : boardID }).except(function (e) {
                        
                        Ext.Msg.show({
                           title    : 'Error:',
                           msg      : e + '',
                           
                           buttons  : Ext.Msg.OK,
                           icon     : Ext.MessageBox.ERROR
                        })
                        
                        this.RETURN()
                        
                    }).andThen(function (replica) {
                        
                        var board = replica.getTopic()
                        
                        this.addBoard(board)
                        
                        this.createBoard(c, board)
                        
                        this.CONTINUE()
                        
                    }, this)
                    
                    return
                }
                
                this.createBoard(c, this.getBoard(boardID))
                
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


