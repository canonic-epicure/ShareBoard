Class('Vero.Mutation', {
    
    has : {
        timestamp               : Joose.I.Date,
        uuid                    : Joose.I.UUID, // overkill? compact uuid (base91)
        
        state                   : 'transient',
        
        creator                 : null
    },
    
    
    methods : {
    }
})

