Class('ShareBoard.View.Tool.Line', {
    
    isa     : 'ShareBoard.View.Tool',
    
    use     : [
        'ShareBoard.Model.Board.Element.Line'
    ],
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        }
    },
    
    
    methods : {
        
        onMouseDown : function (event) {
            
            if (this.model) {
                this.model.cancel()
                
                this.reset()
            }
            
            var board = this.getBoard()
            
            var model = this.model = new ShareBoard.Model.Board.Element.Line({
                x       : this.getLayerX(event),
                y       : this.getLayerY(event),
                
                x1      : this.getLayerX(event),
                y1      : this.getLayerY(event),
                
                
                board   : board,
                replica : board.replica
            })
            
            board.addElement(model)
        },
        
        
        onMouseMove : function (event) {
            var model = this.model
            
            if (model) {
                model.sketch(this.getLayerX(event), this.getLayerY(event))
                
                model.replica.commit()
            }
        },
        
        
        onMouseUp : function (event) {
            var model = this.model
            
            if (model) {
                model.put(this.getLayerX(event), this.getLayerY(event))
                
                model.replica.commit()
            }
            
            this.reset()
        }
    },
    
    body : function () {
        
        ShareBoard.View.Tool.register('line', this)
    }
})


