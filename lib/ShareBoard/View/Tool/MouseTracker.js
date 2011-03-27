Role('ShareBoard.View.Tool.MouseTracker', {
    
    requires        : [ 'reset', 'createElement', 'drawElement' ],
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        firstX          : null,
        firstY          : null,
        
        firstMove       : false,
        hasClick        : false,
        
        prevX           : null,
        prevY           : null
    },
    
    
    methods : {
        
        onMouseDown : function (event) {
            this.firstMove  = true
            this.hasClick   = true
            
            this.firstX     = this.prevX = this.getLayerX(event)
            this.firstY     = this.prevY = this.getLayerY(event)
            
            if (this.model) {
                this.reset()
            }
        },
        
        
        onMouseMove : function (event) {
            if (!this.hasClick && this.model) {
                this.reset()
                
                return
            }
            
            if (this.hasClick && this.firstMove) {
                this.firstMove = false
                
                this.model = this.getBoard().addElement(this.createElement())
            }
            
            var model       = this.model
            
            var layerX      = this.getLayerX(event)
            var layerY      = this.getLayerY(event)
            
            if (model) this.drawElement(model, layerX, layerY, this.prevX, this.prevY)
            
            this.prevX = layerX
            this.prevY = layerY
        },
        
        
        onMouseUp : function (event) {
            this.hasClick   = false
            
            var model = this.model
            
            if (model) {
                this.drawElement(model, this.getLayerX(event), this.getLayerY(event), this.prevX, this.prevY)
                
                model.setStatus('element')
            }
            
            this.reset(true)
        }
    }
})
