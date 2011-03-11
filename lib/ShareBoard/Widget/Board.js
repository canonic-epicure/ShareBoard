Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Container,
    
    use     : 'ShareBoard.View.Board',
    
    has : {
        board       : { required : true },
        
        usersStore  : function () {
            
            return new Ext.data.ArrayStore({
                
                fields      : [ 'nickName', 'you' ],
                
                data        : []
            })
        }
    },
    
    
    before : {
        
        initComponent : function () {
            
            var board       = this.board
            var replica     = board.replica
            
            board.FLASH.on('/mutation/commit/**', this.updateUsers, this)
            
            
            Ext.apply(this, {
                
                slots           : true,
                
                title           : 'ShareBoard',
                bodyCssClass    : 'ShareBoard-Board',
                
                layout          : 'border',
                
                items           : [
                    {
                        region      : 'center',
                        slot        : 'drawArea',
                        
                        xtype       : 'ShareBoard.View.Board',
                        
                        board       : this.board
                    },
                    {
                        region      : 'east',
                        slot        : 'settings',
                        
                        width       : 200,
                        
                        title           : 'Settings',
                        
                        split           : true,
                        collapsible     : true,
                        collapseMode    : 'mini',
                        
                        bodyStyle   : 'padding : 10px',
                        
                        items       : [
                            {
                                xtype       : 'dataview',
                                
                                store       : this.usersStore,
                                
                                itemSelector    : 'div.sh-userlist-user',
                                
                                tpl             : new Ext.XTemplate(
                                    '<tpl for=".">',
                                        '<div class="sh-userlist-user">',
                                            '{nickName}',
                                            '{you}',
                                        '</div>',
                                    '</tpl>',
                                    '<div class="x-clear"></div>'
                                )
                            }
                        ]
                    }
                ]
            })
            
            this.updateUsers()
            
            this.on('afterlayout', this.onAfterLayout, this, { single : true })
        }
    },
    
    
    methods : {
        
        getID   : function (config) {
            return this.meta.name + ':' + config.board.uuid
        },
        
        
        onAfterLayout : function () {
            
//            Ext.MessageBox.prompt('Introduce yourself:', '', function (button, name) {
//                
//                if (button == 'ok') {
//                    this.board.getOwnFlash().get('user').setNickName(name)
//                    
//                    this.updateUsers()
//                }
//                
//            }, this)
        },
        
        
        updateUsers : function () {
            this.usersStore.loadData(this.collectUsers())
        },
        
        
        collectUsers : function () {
            
            var board       = this.board
            var replica     = board.replica
            
            var users       = []
            
            board.FLASH.each(function (flash) {
                var user = flash.get('user')
                
                if (user) 
                    if (flash == board.getOwnFlash())
                        users.unshift( [ user.getNickName(), true ] )
                    else
                        users.push( [ user.getNickName(), false ] )
            })
            
            return users
        }
    }
    
})
