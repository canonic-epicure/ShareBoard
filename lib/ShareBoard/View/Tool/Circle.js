Class('ShareBoard.View.Tool.Circle', {
    
    isa     : 'ShareBoard.View.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        firstX          : null,
        firstY          : null,
        firstMove       : false,
        hasClick        : false
    },
    
    
    methods : {
        
        onMouseDown : function (event) {
            this.firstMove  = true
            this.hasClick   = true
            this.firstX     = this.getLayerX(event)
            this.firstY     = this.getLayerY(event)
            
            if (this.model) {
//                this.model.cancel()
                
                this.reset()
            }
        },
        
        
        onMouseMove : function (event) {
            if (this.hasClick && this.firstMove) {
                this.firstMove = false
                
                var board = this.getBoard()
                
                var model = this.model = new ShareBoard.Model.Board.Element.Circle({
                    x       : this.firstX,
                    y       : this.firstY,
                    
                    board   : board,
                    replica : board.replica
                })
                
                board.addElement(model)
            }
            
            var model = this.model
            
            if (model) model.setRadiusFromPoint(this.getLayerX(event), this.getLayerY(event))
        },
        
        
        onMouseUp : function (event) {
            this.hasClick   = false
            
            var model = this.model
            
            if (model) {
                model.setRadiusFromPoint(this.getLayerX(event), this.getLayerY(event))
                
                model.setStatus('element')
            }
            
            this.reset()
        }
    },
    
    body : function () {
        
        ShareBoard.View.Tool.register('circle', this)
    }
})
