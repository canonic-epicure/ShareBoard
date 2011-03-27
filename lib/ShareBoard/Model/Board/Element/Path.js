Module('ShareBoard.Model.Board.Element.Path', {
  
    use            : [
        'Syncler',
        'ShareBoard.Model.Board.Element',
        'KiokuJS.Feature.Attribute.Skip'
    ],
    
    
body : function () {
    
    
    Class('.ShareBoard.Model.Board.Element.Path', {
        
        isa     : ShareBoard.Model.Board.Element,
        
        has : {
            segments        : Syncler.I.Array,
            
            path            : Joose.I.Array,
            x1              : null,
            y1              : null,
            
            widgetClass     : 'ShareBoard.View.Board.Element.Path'
        },
        
        
        methods : {
            
            initialize : function () {
                this.segments.push('M', this.x, this.y)
                
                this.setX1(this.x)
                this.setY1(this.y)
            },
            
            
            addSegment : function (dx, dy) {
                this.segments.push('l', dx, dy)
                
                this.setX1(this.x1 + dx)
                this.setY1(this.y1 + dy)
            },
            
            
            getPath     : function () {
                return this.segments.value + ''
            },
            
            
            moveTo : function (x, y) {
                var dx  = x - this.x
                var dy  = y - this.y
                
                this.SUPER(x, y)
                
                this.segments.set(1, x)
                this.segments.set(2, y)

                this.setX1(this.x1 + dx)
                this.setY1(this.y1 + dy)
            }
            
        }
    })
    
}})

