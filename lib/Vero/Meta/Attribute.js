Role('Vero.Meta.Attribute', {
    
    use     : 'Vero.Mutation',
    
    
    has : {
        is                      : 'rw',
        
        concurrency             : 'lastWin'  // the only supported value for now
    },
    
    
    override : {
        
        setRawValueTo : function (instance, value, options) {
            
            var mutation = new Vero.Mutation({
                
                attributeName       : this.name,
                
                oldValue            : this.getRawValueFrom(instance),
                newValue            : value
            })
            
            this.SUPER(instance, value, options)
            
            instance.VERO.addMutation(mutation)
        }
    }
})

