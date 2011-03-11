Class('ShareBoard.View.Board.Element.Line', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
        selSize         : 8,
        
        raphSelStart    : null,
        raphSelEnd      : null
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var line    = this.model
            
            var raphael = this.raphael  = this.getPaper().path( line.getPath() )
            var node    = this.node     = Ext.get(raphael.node)
            
            var clicker = this.clicker  = this.getPaper().path( line.getPath() )
            clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            var original
            var boardWidget     = this.boardWidget
            var me              = this
            
            clicker.drag(function (dx, dy) {
                
                line.setX( original[0] + dx )
                line.setY( original[1] + dy )
                
                line.setX1( original[2] + dx )
                line.setY1( original[3] + dy )
                
                if (me.isSelected) {
                    var selSize             = me.selSize
                    
                    me.raphSelStart.attr({
                        x       : line.x - selSize / 2,
                        y       : line.y - selSize / 2
                    })

                    me.raphSelEnd.attr({
                        x       : line.x1 - selSize / 2,
                        y       : line.y1 - selSize / 2
                    })
                }
                
            }, function () {
                boardWidget.onDragStart()
                
                original = [ line.x, line.y, line.x1, line.y1 ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.updateStyle()
            
            Ext.get(clicker.node).on('click', this.onNodeClick, this)
            Ext.get(clicker.node).setStyle('cursor', 'move')
            
            this.SUPER()
        },
        
        
        onAttributeMutate : function (event, mutation) {
            var line        = this.model
            
            if (mutation.attributeName == 'status' && mutation.newValue == 'element')
                this.updateStyle()
            else {
                this.raphael.attr({
                    path : line.getPath()
                })
                
                this.clicker.attr({
                    path : line.getPath()
                })
                
                if (this.isSelected) {
                    var selSize             = this.selSize
                    
                    this.raphSelStart.attr({
                        x               : line.x - selSize / 2,
                        y               : line.y - selSize / 2
                    })
                    
                    this.raphSelEnd.attr({
                        x               : line.x1 - selSize / 2,
                        y               : line.y1 - selSize / 2
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
            var line                = this.model
            
            this.raphSelStart       = this.getPaper().rect(
                line.x - selSize / 2, line.y - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelStart.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            
            this.raphSelEnd       = this.getPaper().rect(
                line.x1 - selSize / 2, line.y1 - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelEnd.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            var originalStart
            var originalEnd
            var boardWidget     = this.boardWidget
            var me              = this
            
            
            this.raphSelStart.drag(function (dx, dy) {
                
                line.setX( originalStart[0] + dx )
                line.setY( originalStart[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalStart = [ line.x, line.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            
            this.raphSelEnd.drag(function (dx, dy) {
                
                line.setX1( originalEnd[0] + dx )
                line.setY1( originalEnd[1] + dy )
                
            }, function () {
                boardWidget.onDragStart()
                
                originalEnd = [ line.x1, line.y1 ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.isSelected = true
        },
        
        
        deselect : function () {
            if (!this.isSelected) return
            
            this.raphSelStart.remove()
            this.raphSelEnd.remove()
            
            delete this.raphSelStart
            delete this.raphSelEnd
            
            this.isSelected = false
        },
        
        
        remove : function () {
            if (this.isSelected) this.deselect()
            
            this.SUPER()
        }
    }
})
