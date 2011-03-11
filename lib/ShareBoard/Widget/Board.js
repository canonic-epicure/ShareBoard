Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Container,
    
    use     : 'ShareBoard.View.Board',
    
    has : {
        board       : { required : true },
        
        usersStore  : function () {
            
            return new Ext.data.ArrayStore({
                
                fields      : [ 'nickName' ],
                
                data        : []
            })
        }
    },
    
    
    before : {
        
        initComponent : function () {
            
            var board       = this.board
            var replica     = board.replica
            
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
                        
                        bodyStyle       : 'padding : 10px',
                        
                        items           : [
                            {
                                slot    : 'ownNick',
                                
                                title   : 'You',
                                
                                cls     : 'sh-ownnick-panel',
                                border  : false,
                                
                                buttonAlign     : 'center',
                                buttons : [
                                    {
                                        text    : 'Introduce',
                                        
                                        handler : this.onIntroduce,
                                        scope   : this
                                    }
                                ]
                            
                            },
                            
                            {
                                title   : 'Others',
                                border  : false,
                                
                                items   : [
                                    {
                                        xtype       : 'dataview',
                                        
                                        store       : this.usersStore,
                                        
                                        itemSelector    : 'div.sh-userlist-user',
                                        
                                        tpl             : new Ext.XTemplate(
                                            '<tpl for=".">',
                                                '<div class="sh-userlist-user">',
                                                    '{nickName}',
                                                '</div>',
                                            '</tpl>',
                                            '<div class="x-clear"></div>'
                                        )
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            
            board.FLASH.on('/mutation/commit/**', this.updateUsers, this)
        }
    },
    
    
    after : {
        
        initComponent : function () {
            this.updateUsers()
        }
    },
    
    
    methods : {
        
        getID   : function (config) {
            return this.meta.name + ':' + config.board.uuid
        },
        
        
        onIntroduce : function () {
            
            Ext.MessageBox.prompt('Introduce yourself:', '', function (button, name) {
                
                if (button == 'ok') {
                    this.board.getOwnFlash().get('user').setNickName(name)
                    
                    this.updateUsers()
                }
                
            }, this)
        },
        
        
        updateUsers : function () {
            var ownNickPanel    = this.slots.ownNick
            var ownNick         = this.board.getOwnFlash().get('user').nickName
            
            if (ownNickPanel.rendered)
                ownNickPanel.body.update(ownNick)
            else
                ownNickPanel.html = ownNick
            
            this.usersStore.loadData(this.collectUsers())
        },
        
        
        collectUsers : function () {
            
            var board       = this.board
            var replica     = board.replica
            
            var users       = []
            
            board.FLASH.each(function (flash) {
                var user = flash.get('user')
                
                if (user) 
                    if (flash != board.getOwnFlash())
                        users.push( [ user.getNickName() ] )
            })
            
            return users
        }
    }
    
})
