Class('ShareBoard.Widget.Home', {
    
    isa     : Ext.Panel,
    
    use : [
        'ShareBoard.Model.Board'
    ],
    
    
    has : {
        
    },
    
    
    before : {
        
        initComponent : function () {
            
            Ext.apply(this, {
                
                bodyStyle   : 'padding-top  : 20px',
                
                autoHeight  : true,
                
                border      : false,
                
                buttonAlign     : 'center',
                buttons         : [
                    {
                        text    : 'Create New Board',
                        
                        iconCls : 'sb-icon-board',
                        scale   : 'large',
                        
                        handler : this.onNewBoard,
                        scope   : this
                    }
                ],
                
                items : [
                    {
                        xtype       : 'ExtX.Shotenjin.Container',
                        
                        templateSources : {
                            /*tjfile(Home.tj.html)tjfile*/
                        }
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
