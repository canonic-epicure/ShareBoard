Class('ShareBoard.View.Board.Element.Circle', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    use     : 'ShareBoard.Model.Board.Element.Circle',
    
    
    has : {
        selSize         : 8,
        
        raphSelLeft     : null,
        raphSelRight    : null
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var circle  = this.model
            
            var raphael = this.raphael  = this.getPaper().circle( circle.x, circle.y, circle.radius )
            var node    = this.node     = Ext.get(raphael.node)
            
            var clicker = this.clicker  = this.getPaper().circle( circle.x, circle.y, circle.radius )
            clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            var original
            var boardWidget     = this.boardWidget
            var me              = this
            
            clicker.drag(function (dx, dy) {
                
                circle.setX( original[0] + dx )
                circle.setY( original[1] + dy )
                
                if (me.isSelected) {
                    var selSize             = me.selSize
                    
                    me.raphSelLeft.attr({
                        x               : circle.x - circle.radius - selSize / 2,
                        y               : circle.y - selSize / 2
                    })
                    
                    me.raphSelRight.attr({
                        x               : circle.x + circle.radius - selSize / 2,
                        y               : circle.y - selSize / 2
                    })
                }
                
            }, function () {
                console.log('circle drag start')
                
                boardWidget.onDragStart()
                
                original = [ circle.x, circle.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.updateStyle()
            
            Ext.get(clicker.node).on('click', this.onNodeClick, this)
            Ext.get(clicker.node).setStyle('cursor', 'move')
            
            this.SUPER()
        },
        
        
        onAttributeMutate : function (object, mutation) {
            var circle  = this.model
            
            if (mutation.attributeName == 'status' && mutation.newValue == 'element')
                this.updateStyle()
            else {
                this.raphael.attr({
                    cx  : circle.x,
                    cy  : circle.y,
                    r   : circle.radius
                })
                
                this.clicker.attr({
                    cx  : circle.x,
                    cy   : circle.y,
                    r : circle.radius
                })
                
                if (this.isSelected) {
                    var selSize             = this.selSize
                    
                    this.raphSelLeft.attr({
                        x               : circle.x - circle.radius - selSize / 2,
                        y               : circle.y - selSize / 2
                    })
                    
                    this.raphSelRight.attr({
                        x               : circle.x + circle.radius - selSize / 2,
                        y               : circle.y - selSize / 2
                    })
                }
            }
        },
        
        
        onNodeClick : function (e) {
            this.boardWidget.onBeforeSelect(this)
            
            this.select()
        },
        
        
        select : function () {
            if (this.isSelected) return
            
            var selSize             = this.selSize
            var circle              = this.model
            
            this.raphSelLeft        = this.getPaper().rect(
                circle.x - circle.radius - selSize / 2, circle.y - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelLeft.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            
            this.raphSelRight       = this.getPaper().rect(
                circle.x + circle.radius - selSize / 2, circle.y - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelRight.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            var originalStart
            var originalEnd
            var boardWidget     = this.boardWidget
            var me              = this
            
            
            this.raphSelLeft.drag(function (dx, dy) {
                
                circle.setRadiusFromPoint( originalStart[0] + dx, originalStart[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalStart = [ circle.x - circle.radius, circle.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            
            this.raphSelRight.drag(function (dx, dy) {
                
                circle.setRadiusFromPoint( originalEnd[0] + dx, originalEnd[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalEnd = [ circle.x + circle.radius, circle.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.isSelected = true
        },
        
        
        deselect : function () {
            if (!this.isSelected) return
            
            this.raphSelLeft.remove()
            this.raphSelRight.remove()
            
            delete this.raphSelLeft
            delete this.raphSelRight
            
            this.isSelected = false
        },
        
        
        remove : function () {
            if (this.isSelected) this.deselect()
            
            this.SUPER()
        }
    }
})
