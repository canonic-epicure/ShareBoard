Class('Vero.Object', {
    
    meta        : Joose.Meta.Class,
    
    isa         : Ext.util.Observable,
    
    
    has : {
        object                  : null,
        
        history                 : Joose.I.Array
        
//        ,
//        
//        channel                 : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('mutate'/*, 'commit'*/)
        },
        
        
        addMutation : function (mutation) {
            this.history.push(mutation)
            
            this.fireEvent('mutate', this, mutation)
        }
        
//        ,
//        commit      : function (type) {
//            var currentPacket = this.currentPacket
//            
//            if (currentPacket.length()) {
//                
//                currentPacket.type = type || 'update'
//                
//                this.history.push(currentPacket)
//                
//                this.currentPacket = new Vero.Mutation.Packet()
//                
//                this.fireEvent('commit', this, currentPacket)
//            }
//        }
    }
})

