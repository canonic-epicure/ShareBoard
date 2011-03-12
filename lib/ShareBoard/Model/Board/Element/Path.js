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
            
            widgetClass     : 'ShareBoard.View.Board.Element.Path'
        },
        
        
        methods : {
            
            getX1 : function () {
                var x    = this.x
                
                this.segments.each(function (segment) {
                    x   += segment[ 0 ]
                })
                
                return x
            },
            
            
            getY1 : function () {
                var y    = this.y
                
                this.segments.each(function (segment) {
                    y   += segment[ 1 ]
                })
                
                return y
            },
            
            
            addSegment : function (dx, dy) {
                this.segments.push([ dx, dy ])
            },
            
            
            getPath     : function () {
                var path = 'M ' + this.x + ' ' + this.y
                
                this.segments.each(function (segment) {
                    path   += 'l' + segment[ 0 ] + ' ' + segment[ 1 ]
                })
                
                return path
            }        
        }
    })
    
}})

