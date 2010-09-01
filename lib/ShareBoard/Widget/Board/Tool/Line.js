Class('ShareBoard.Widget.Board.Tool.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    use     : [
        'ShareBoard.Model.Board.Element.Line'
    ],
    
    
    has : {
        trackEvents     : { 
            init : [ 'MouseDown', 'MouseUp', 'MouseMove' ] 
        },
        
        model           : null
    },
    
    
    methods : {
        
        reset : function () {
            delete this.model
        },
        
        
        onMouseDown : function (event) {
            
            if (this.model) {
                this.model.cancel()
                
                this.reset()
            }
            
            var model = this.model = new ShareBoard.Model.Board.Element.Line({
                x       : this.getLayerX(event),
                y       : this.getLayerY(event),
                
                board   : this.board
            })
            
            this.board.addElement(model)
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


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)