Class('Vero.Channel', {
    
    meta        : Joose.Meta.Class,
    
    isa         : Ext.util.Observable,
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        }
    ],
    
    
    
    has : {
        fayeClient              : null,
        uuid                    : Joose.I.UUID,
        
        url                     : null,
        options                 : null,
        
        objects                 : Joose.I.Object,
        
        filterOwnMessages       : true,
        
        queue                   : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('newObject', 'mutation', 'message')
            
            this.fayeClient = new Faye.Client(this.url, this.options)
        },
        
        
        register : function (object) {
//            this.objects[ object.uuid ] = object
            
            object.on('commit', this.onObjectCommit, this)
        },
        
        
        onObjectCommit : function (object, packet) {
            this.queue.push(packet)
        },
        
        
        subscribe : function (channel, func, scope) {
            var me = this
            
            this.fayeClient.subscribe(channel, function (wrapper) {
                
                if (me.filterOwnMessages && wrapper.sender == me.uuid) return
                
                func.call(scope || me, me, wrapper.message)
            })
        },
        
        
        publish : function (channel, message) {
            
            var wrapper = {
                sender  : this.uuid,
                
                message : message
            }
            
            this.fayeClient.publish(channel, wrapper)
        },
        
        
        commit : function () {
            var queue = this.queue
            
            if (queue.length) {
            
                this.queue = []
                
                this.publish('/update', queue)
            }
        }
    }
})

