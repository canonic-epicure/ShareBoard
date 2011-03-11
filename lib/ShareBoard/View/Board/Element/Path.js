Class('ShareBoard.View.Board.Element.Path', {
    
    isa     : 'ShareBoard.View.Board.Element',
    
    
    has : {
        selSize         : 8,
        
        raphSelStart    : null,
        raphSelEnd      : null
    },
    

    
    after : {
        
        initialize : function () {
            this.model.segments.on('/mutation/commit/**', this.onAttributeMutate, this)
        }
    },
    
    
    methods : {
        
        render : function () {
            var board   = this.getBoard()
            var path    = this.model
            
            var raphael = this.raphael  = this.getPaper().path( path.getPath() )
            var node    = this.node     = Ext.get(raphael.node)
            
            var clicker = this.clicker  = this.getPaper().path( path.getPath() )
            clicker.attr({
                opacity             : 0,
                'stroke-width'      : 10
            })
            
            var original
            var boardWidget     = this.boardWidget
            var me              = this
            
            clicker.drag(function (dx, dy) {
                
                path.setX( original[0] + dx )
                path.setY( original[1] + dy )
                
                if (me.isSelected) {
                    var selSize             = me.selSize
                    
                    me.raphSelStart.attr({
                        x       : path.x - selSize / 2,
                        y       : path.y - selSize / 2
                    })

                    me.raphSelEnd.attr({
                        x       : path.getX1() - selSize / 2,
                        y       : path.getY1() - selSize / 2
                    })
                }
                
            }, function () {
                boardWidget.onDragStart()
                
                original = [ path.x, path.y ]
                
            }, function () {
                
                boardWidget.onDragEnd()
            })
            
            this.updateStyle()
            
            Ext.get(clicker.node).on('click', this.onNodeClick, this)
            Ext.get(clicker.node).setStyle('cursor', 'move')
            
            this.SUPER()
        },
        
        
        onAttributeMutate : function (event, mutation) {
            var path        = this.model
            
            if (mutation.attributeName == 'status' && mutation.newValue == 'element')
                this.updateStyle()
            else {
                this.raphael.attr({
                    path : path.getPath()
                })
                
                this.clicker.attr({
                    path : path.getPath()
                })
                
                if (this.isSelected) {
                    var selSize             = this.selSize
                    
                    this.raphSelStart.attr({
                        x               : path.x - selSize / 2,
                        y               : path.y - selSize / 2
                    })
                    
                    this.raphSelEnd.attr({
                        x               : path.getX1() - selSize / 2,
                        y               : path.getY1() - selSize / 2
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
            var path                = this.model
            
            this.raphSelStart       = this.getPaper().rect(
                path.x - selSize / 2, path.y - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelStart.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
            
            this.raphSelEnd       = this.getPaper().rect(
                path.getX1() - selSize / 2, path.getY1() - selSize / 2, selSize, selSize, 3
            )
            
            this.raphSelEnd.attr({
                fill            : 'white',
                'fill-opacity'  : 0
            })
            
//            var originalStart
//            var originalEnd
//            var boardWidget     = this.boardWidget
//            var me              = this
//            
//            
//            this.raphSelStart.drag(function (dx, dy) {
//                
//                path.setX( originalStart[0] + dx )
//                path.setY( originalStart[1] + dy )
//                
//            }, function () {
//                boardWidget.onDragStart()
//                
//                originalStart = [ path.x, path.y ]
//                
//            }, function () {
//                
//                boardWidget.onDragEnd()
//            })
//            
//            
//            this.raphSelEnd.drag(function (dx, dy) {
//                
//                path.setX1( originalEnd[0] + dx )
//                path.setY1( originalEnd[1] + dy )
//                
//            }, function () {
//                boardWidget.onDragStart()
//                
//                originalEnd = [ path.x1, path.y1 ]
//                
//            }, function () {
//                
//                boardWidget.onDragEnd()
//            })
            
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
