Class('ShareBoard.View.Tool.Line', {
    
    isa     : 'ShareBoard.View.Tool',
    
    use     : [
        'ShareBoard.Model.Board.Element.Line'
    ],
    
    
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
                
                var model = this.model = new ShareBoard.Model.Board.Element.Line({
                    x       : this.firstX,
                    y       : this.firstY,
                    
                    x1      : this.getLayerX(event),
                    y1      : this.getLayerY(event),
                    
                    color   : board.view.getCurrentColor(),
                    
                    board   : board,
                    replica : board.replica
                })
                
                board.addElement(model)
            }
            
            var model = this.model
            
            if (model) {
                model.setX1(this.getLayerX(event))
                model.setY1(this.getLayerY(event))
            }
        },
        
        
        onMouseUp : function (event) {
            this.hasClick   = false
            
            var model = this.model
            
            if (model) {
                model.setX1(this.getLayerX(event))
                model.setY1(this.getLayerY(event))
                
                model.setStatus('element')
            }
            
            this.reset()
        }
    },
    
    body : function () {
        
        ShareBoard.View.Tool.register('line', this)
    }
})


