Class('ShareBoard.Widget.Board.Tool.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
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
                channel : board.channel
            })
            
            board.addElement(model)
        },
        
        
        onMouseMove : function (event) {
            var model = this.model
            
            if (model) {
                model.sketch(this.getLayerX(event), this.getLayerY(event))
                
                model.channel.commit()
            }
        },
        
        
        onMouseUp : function (event) {
            var model = this.model
            
            if (model) {
                model.put(this.getLayerX(event), this.getLayerY(event))
                
                model.channel.commit()
            }
            
            this.reset()
        }
    },
    
    body : function () {
        
        ShareBoard.Widget.Board.Tool.register('line', this)
    }
})


