Class('ShareBoard.Widget.Root', {
    
    isa : Ext.Container,
    
    does : 'Symbie.Widget.Root',
    
    use : [ 'ShareBoard.Router' ],
    
    
    has : {
        routerClass : Joose.I.FutureClass('ShareBoard.Router'),
        
        title : 'Joose it!',
        
        layout : 'card',
        
        autoWidth       : true,
        autoHeight      : true
    },
    
    
    after : {
        initComponent : function () {
            this.renderTo = this.el = Ext.getBody()
            
            this.allowDomMove = false
            
            Ext.EventManager.onWindowResize(this.doLayout, this)
        }
    }
    
})