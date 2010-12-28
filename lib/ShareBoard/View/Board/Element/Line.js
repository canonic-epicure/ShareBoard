Class('ShareBoard.View.Board.Element.Line', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
    },
    
    
    methods : {
        
        getStyle : function (attr) {
            var viewProp = (this.model.status == 'draft' ? 'phantom' : 'current') + Joose.S.uppercaseFirst(attr)
            
            return this.getBoard().view[ viewProp ]
        },
        
        
        updateStyle : function () {
            this.raphael.attr({
                opacity             : this.getStyle('opacity'),
                stroke              : this.getStyle('color'),
                'stroke-dasharray'  : this.getStyle('dashing'),
                'stroke-width'      : this.getStyle('width')
            })
        },
        
        
        render : function () {
            var board   = this.getBoard()
            var line    = this.model
            
            this.raphael = this.getPaper().path( line.getPath() )
            
            this.updateStyle()
        },
        
        
        onAttributeMutate : function (object, attrName, value, hasOldValue, oldValue) {
            var line        = this.model
            
            if (attrName == 'status' && oldValue == 'draft')
                this.updateStyle()
            else
                this.raphael.attr({
                    path : line.getPath()
                })
        }
    }
})
