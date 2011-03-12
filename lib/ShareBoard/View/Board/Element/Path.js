Class('ShareBoard.View.Board.Element.Path', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    does    : [
        'ShareBoard.View.Board.Element.Selectable',
        'ShareBoard.View.Board.Element.Draggable'
    ],
    
    
    after : {
        
        initialize : function () {
            this.model.segments.on('/mutation/commit/**', this.updatePosition, this)
        }
    },
    
    
    methods : {
        
        updatePosition : function () {
            var path        = this.model.getPath()
            
            this.raphael.attr({ path : path })
            this.clicker.attr({ path : path })
        },
        
        
        onAttributeMutate : function (event, mutation) {
            var attributeName       = mutation.attributeName
            
            if (attributeName == 'status')
                this.updateStyle()
            else
                this.updatePosition()
        }
    },
    
    
    augment : {
        
        render : function () {
            var path    = this.model.getPath()
            var paper   = this.getPaper()
            
            this.raphael  = paper.path( path )
            
            this.clicker  = paper.path( path )
            this.clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            this.updateStyle()
            
            this.INNER()
        }
    }
})
