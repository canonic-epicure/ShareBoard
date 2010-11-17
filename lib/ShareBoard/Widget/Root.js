Class('ShareBoard.Widget.Root', {
    
    isa : Ext.Viewport,
    
    
    has : {
        slots   : true,
        
        app     : {
            required         : true
        },
        
        title   : 'Symbie test application',
        
        layout          : 'card',
        activeItem      : 0,
        
        autoWidth       : true,
        autoHeight      : true
    },
    
    
    methods : {
    
        // some mysterious override for ExtJS internals
        fireResize : function (w, h) {
            this.doLayout()
        }
    }
})
