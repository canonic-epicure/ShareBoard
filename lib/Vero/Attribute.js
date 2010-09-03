Role('Vero.Attribute', {
    
    use     : 'Vero.Mutation.Update',
    
    
    has : {
        is                      : 'rw',
        
        concurrency             : 'lastWin'  // the only supported value for now
    },
    
    
    override : {
        
        setRawValueTo : function (instance, value, isExternal) {
            
            if (isExternal) {
                this.SUPER(instance, value)
                
                return
            }
            
            var mutation = new Vero.Mutation.Update({
                
                attributeName       : this.name,
                
                oldValue            : this.getRawValueFrom(instance),
                newValue            : value,
                
                objectUUID          : instance.UUID
            })
            
            this.SUPER(instance, value)
            
            instance.VERO.addMutation(mutation)
        }
    }
})

