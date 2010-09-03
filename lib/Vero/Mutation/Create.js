Class('Vero.Mutation.Create', {
    
    isa     : 'Vero.Mutation',
    
    use     : 'Vero.Object',
    
    
    has : {
        // XXX traits & versions
        className       : null,
        
        objectUUID      : null
    },
    
    
    methods : {
        
        activate : function (channel) {
            var constructor = eval(this.className)
            
            var f               = function () {}
            f.prototype         = constructor.prototype
            
            var instance = new f()
            
            var VERO = instance.VERO = new Vero.Object({
                UUID        : this.objectUUID,
                
                object      : instance,
                
                channel     : channel
            })
        }
    }
})
