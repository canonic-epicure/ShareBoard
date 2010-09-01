Class('ShareBoard.Model.Board.Element', {
    
    // XXX `does : JooseX.Observable`
    isa         : Ext.util.Observable,
    
    meta        : Joose.Meta.Class,
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        lastMutatedAt   : null,
        
        x               : { required : true },
        y               : { required : true },
        
        scale           : 1,
        rotation        : 0,
        
        board           : { required : true },
        
        status          : 'phantom',
        
        isShadow        : false,
        
        widgetClass     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('create', 'sketch', 'put', 'mutate')
            this.enableBubble('create', 'sketch', 'put', 'mutate')
//            
//            this.fireEvent('create', this)
            
            
            if (!this.isShadow) this.mutate(this.getInitialMutation(), { initial : true })
        },
        
        
        getInitialMutation : function () {
            return {
                uuid    : this.uuid,
                
                createdAt   : this.createdAt,
                createdBy   : this.createdBy,
                
                x       : this.x,
                y       : this.y,
                
                status  : this.status,
                
                className   : this.meta.name
            }
        },
        
        
        getBubbleTarget : function () {
            return this.board
        },
        
        
        sketch : function () {
        },
        
        
        put : function () {
        },
        
        
        cancel : function () {
        },
        
        
        mutate  : function (packet, options) {
            this.mutateSilently(packet, options)
            
            packet.uuid = this.uuid
            
            this.fireEvent('mutate', this, packet, options)
        },
        
        
        mutateSilently  : function (packet, options) {
            var me = this
            
            options = options || {}
            
            if (!options.initial) Joose.O.each(packet, function (value, name) {
                me[ name ] = value
            })
            
            this.lastMutatedAt = new Date()
        }
        
    }
    
})

