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
        
        
        generateModelElement : function (x, y) {
            return new ShareBoard.Model.Board.Element.Line({
                x       : x,
                y       : y,
                
                board   : this.board
            })
        },
        
        
        onMouseDown : function (event) {
            
            if (this.model) {
//                this.model.remove()
                
                this.reset()
            }
            
            var model = this.model = this.generateModelElement(this.getLayerX(event), this.getLayerY(event))
            
            this.board.addElement(model)
        },
        
        
        onMouseMove : function (event) {
            var line = this.model
            
            if (line) line.sketch(this.getLayerX(event), this.getLayerY(event))
        },
        
        
        onMouseUp : function (event) {
            var line = this.model
            
            if (line) line.put(this.getLayerX(event), this.getLayerY(event))
            
            this.reset()
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)