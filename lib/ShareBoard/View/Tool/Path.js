Class('ShareBoard.View.Tool.Path', {
    
    isa     : 'ShareBoard.View.Tool',
    
    use     : [
        'ShareBoard.Model.Board.Element.Path'
    ],
    
    
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
            if (this.hasClick && this.firstMove) {
                this.firstMove = false
                
                var board = this.getBoard()
                
                var model = this.model = new ShareBoard.Model.Board.Element.Path({
                    x       : this.firstX,
                    y       : this.firstY,
                    
                    color   : board.view.getCurrentColor(),
                    
                    board   : board,
                    replica : board.replica
                })
                
                board.addElement(model)
            }
            
            var model = this.model
            
            if (model) model.addSegment(this.getLayerX(event) - this.prevX, this.getLayerY(event) - this.prevY)
            
            this.prevX = this.getLayerX(event)
            this.prevY = this.getLayerY(event)
        },
        
        
        onMouseUp : function (event) {
            this.hasClick   = false
            
            var model = this.model
            
            if (model) {
                model.addSegment(this.getLayerX(event) - this.prevX, this.getLayerY(event) - this.prevY)
                
                model.setStatus('element')
            }
            
            this.reset()
        }
    },
    
    body : function () {
        
        ShareBoard.View.Tool.register('path', this)
    }
})


