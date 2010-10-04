Class('ShareBoard.Widget.Board.Tool.Circle', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
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
            
            var model = this.model = new ShareBoard.Model.Board.Element.Circle({
                x       : this.getLayerX(event),
                y       : this.getLayerY(event),
                
                board   : board,
                channel : board.channel
            })
            
            board.addElement(model)
        },
        
        
        onMouseMove : function (event) {
            var model = this.model
            
            if (model) model.sketch(this.getLayerX(event), this.getLayerY(event))
        },
        
        
        onMouseUp : function (event) {
            var model = this.model
            
            if (model) model.put(this.getLayerX(event), this.getLayerY(event))
            
            this.reset()
        }
        
    }
})


ShareBoard.Widget.Board.Tool.register('circle', ShareBoard.Widget.Board.Tool.Circle)