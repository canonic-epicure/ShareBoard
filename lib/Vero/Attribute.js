Role('Vero.Attribute', {
    
    use     : 'Vero.Mutation.Update',
    
    
    has : {
        is                      : 'rw',
        
        concurrency             : 'lastWin'  // the only supported value for now
    },
    
    
    override : {
        
        getRawValueFrom : function (instance) {
            return this.SUPER(instance)
        },
        
        
        setRawValueTo : function (instance, value, options) {
            
            var mutation = new Vero.Mutation.Update({
                
                attributeName       : this.name,
                
                oldValue            : this.getRawValueFrom(instance),
                newValue            : value,
                
                objectUUID          : instance.UUID
            })
            
            this.SUPER(instance, value, options)
            
            instance.VERO.addMutation(mutation)
        }
    }
})

