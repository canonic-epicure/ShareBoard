Class('ShareBoard.Widget.Board.Element', {
    
    use     : 'Data.UUID',
    
    
    has : {
        
        guid            : function () { return Data.UUID.uuid() },
        
        createdAt       : Joose.I.Now,
        
        createdBy       : null,
        
        layerX          : null,
        layerY          : null,
        
        
        isPressed       : false,
        
        dom             : null,
        el              : null
    },
    
    
    methods : {
        
        initialize : function () {
            
            var el = this.el = Ext.get(this.dom)
            
            el.on('mousedown', this.onMouseDown, this)
            el.on('mousemove', this.onMouseMove, this)
            el.on('mouseup', this.onMouseUp, this)
            
            el.on('mouseover', this.onMouseOver, this)
            el.on('mouseout', this.onMouseOut, this)
        },
        
        
        
        
        
        onMouseDown : function (e) {
            this.isPressed  = true
        },
        
        
        onMouseUp : function (e) {
            this.isPressed  = false
        },
        
        
        onMouseMove : function (e) {
        },
        
        
        onMouseOver : function (e) {
        },
        
        
        onMouseOut : function (e) {
        }
    }
    
})
