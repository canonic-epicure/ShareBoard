Class('ShareBoard.Widget.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    use     : 'Data.UUID',
    
    
    has : {
        element         : null,
        
        layerX          : null,
        layerY          : null,
        
        
        isPressed       : false,
        
        dom             : null,
        el              : null
    },
    
    
    methods : {
        
        initialize : function () {
            
            this.addEvents('drawstep')
            
            var el = this.el = Ext.get(this.dom)
            
            el.on('mousedown', this.onMouseDown, this)
            el.on('mousemove', this.onMouseMove, this)
            el.on('mouseup', this.onMouseUp, this)
            
            el.on('mouseover', this.onMouseOver, this)
            el.on('mouseout', this.onMouseOut, this)
        },
        
        
        destroy : function () {
            var el = this.el
            
            el.un('mousedown', this.onMouseDown, this)
            el.un('mousemove', this.onMouseMove, this)
            el.un('mouseup', this.onMouseUp, this)
            
            el.un('mouseover', this.onMouseOver, this)
            el.un('mouseout', this.onMouseOut, this)
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
