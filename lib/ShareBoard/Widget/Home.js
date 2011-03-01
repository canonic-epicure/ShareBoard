Class('ShareBoard.Widget.Home', {
    
    isa     : 'ExtX.Shotenjin.Panel',
    
    use : [
        'ShareBoard.Model.Board'
    ],
    
    
    has : {
        
        templateSources : {
            
            init    : {
                /*tjfile(Home.tj.html)tjfile*/
            }
        }
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                height  : 800,
                
                border  : false,
                
                tbar    : [
                    {
                        text    : 'New Board',
                        
                        scale   : 'large',
                        
                        handler : this.onNewBoard,
                        scope   : this
                    }
                ]
            })
        }
    },
            
            
    methods : {
        
        onNewBoard : function (button) {
            var app             = ShareBoard()
            var replica         = app.syncler.newReplica()
            
            var board           = new ShareBoard.Model.Board({
                replica         : replica
            })
            
            
            button.disable()
            
            TRY(replica).setup({ topic : board }).except(function (e) {
                
                Ext.Msg.show({
                   title    : 'Error:',
                   msg      : e + '',
                   
                   buttons  : Ext.Msg.OK,
                   icon     : Ext.MessageBox.ERROR
                })
                
                this.RETURN()
                
            }).ensure(function () {
                
                button.enable()
                
                this.CONTINUE()
                
            }).then(function () {
                
                app.addBoard(board)
                
                app.dispatch('/' + board.uuid).now()
                
            }).now()
        }
    }
    
})
