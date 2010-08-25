Class('ShareBoard.Widget.Board.Tool.Line', {
    
    isa     : 'ShareBoard.Widget.Board.Tool',
    
    
    has : {
        trackMouse      : [ 'Click', 'DblClick', 'Move' ]
    },
    
    
    methods : {
        
        onMouseClick : function (event) {
        },
        
        
        onMouseDblClick : function () {
        },
        
        
        onMouseMove : function () {
        }
    }
})


ShareBoard.Widget.Board.Tool.register('line', ShareBoard.Widget.Board.Tool.Line)