Role('Vero.Role', {
    
    has : {
        VERO        : null
    },
    
    
    methods : {
        
        commit : function () {
            this.VERO.commit()
        },
        
        
        mutate : function (func) {
            this.commit()
            
            func.call(this)
            
            this.commit()
        }
    }
})

