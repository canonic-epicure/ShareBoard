Class('Vero.Object', {
    
    meta        : Joose.Meta.Class,
    
    isa         : Ext.util.Observable,
    
    
    use     : 'Vero.Mutation.Packet',
    
    
    has : {
        object                  : null,
        
        currentPacket           : function () { return new Vero.Mutation.Packet() },
        
        history                 : Joose.I.Array,
        
        channel                 : null
    },
    
    
    methods : {
        
        initialize : function () {
            if (this.channel) this.channel.register(this)
            
            this.addEvents('mutation')
        },
        
        
        addMutation : function (mutation) {
            this.currentPacket.push(mutation)
            
            this.fireEvent('mutation', this, mutation)
        },
        
        
        commit      : function (type) {
            var currentPacket = this.currentPacket
            
            if (currentPacket.length()) {
                
                currentPacket.type = type || 'update'
                
                this.history.push(currentPacket)
                
                this.currentPacket = new Vero.Mutation.Packet()
            }
        }
    }
})

