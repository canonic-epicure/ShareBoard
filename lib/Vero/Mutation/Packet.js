Class('Vero.Mutation.Packet', {
    
    has : {
        mutations       : Joose.I.Array,
        
        type            : 'update'
    },
    
    
    methods : {
        
        push : function () {
            var mutations = this.mutations
            
            mutations.push.apply(mutations, arguments)
        },
        
        
        length : function () {
            return this.mutations.length
        }
    }
})

