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
        
        scope                   : Joose.I.Object,
        
        filterOwnMessages       : true,
        
        queue                   : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('newObject', 'mutation', 'message')
            
            this.fayeClient = new Faye.Client(this.url, this.options)
            
            this.fayeClient.subscribe('/update', this.onUpdate, this)
        },
        
        
        register : function (vero) {
            this.scope[ vero.UUID ] = object
            
            object.on('mutate', this.onObjectMutate, this)
        },
        
        
        onObjectMutate : function (object, mutation) {
            this.queue.push(mutation)
        },
        
        
        // XXX cleanup all subscriptions
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
                
                this.publish('/update', Joose.A.map(queue, function (mutation) { return mutation.asObject() } ))
            }
        },
        
        
        getObject : function (uuid) {
            return this.scope[ uuid ]
        },
        
        
        onUpdate : function (channel, message) {
            var me = this
            
            Joose.A.each(message, function (mutationData) {
                
                var mutationClass   = eval(mutationData.className)
                var mutation        = new mutationClass(mutationData.data)
                
                mutation.activate(me)
            })
        }
    }
})

