Class('Vero.Mutation.Delete', {
    
    isa     : 'Vero.Mutation',
    
    
    has : {
        objectUUID              : null
    },
    
    
    methods : {
        
        activate : function (channel) {
            
            channel.deleteObject(this.objectUUID)
        }
    }
})

