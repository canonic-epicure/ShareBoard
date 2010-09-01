Class('ShareBoard.Model.Board.Element', {
    
    // XXX `does : JooseX.Observable`
    isa         : Ext.util.Observable,
    
    meta        : Joose.Meta.Class,
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        x               : { required : true },
        y               : { required : true },
        
        board           : { required : true },
        
        widgetClass     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('sketch', 'put', 'mutate')
            this.enableBubble('sketch', 'put', 'mutate')
        },
        
        
        getBubbleTarget : function () {
            return this.board
        },
        
        
        sketch : function () {
            var args = Array.prototype.slice.call(arguments)
            
            args.unshift('sketch', this)
            
            this.fireEvent.apply(this, args)
        },
        
        
        put : function () {
            var args = Array.prototype.slice.call(arguments)
            
            args.unshift('put', this)
            
            this.fireEvent.apply(this, args)
        },
        
        
        mutate  : function () {
            var args = Array.prototype.slice.call(arguments)
            
            args.unshift('mutate', this)
            
            this.fireEvent.apply(this, args)
        }
    }
    
})
