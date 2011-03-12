Class('ShareBoard.View.Board.Element', {
    
    does    : [
        'JooseX.Observable',
        'ShareBoard.Role.LocalEvent'
    ],
    
    
    has : {
        boardWidget     : { is : 'rw', required : true },
        
        model           : { is : 'rw', required : true },
        
        uuid            : null,
        
        isSelected      : false,
        
        raphael         : null,
        node            : null,
        
        clicker         : null,
        clickerNode     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.uuid       = this.model.uuid
            
            this.model.on('/mutation/apply/Syncler.Mutation.Class.Attribute', this.onAttributeMutate, this)
        },
        
        
        getBoard : function () {
            return this.boardWidget.board
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        render : function () {
            this.INNER()
            
            if (!this.node) this.node = Ext.get(this.raphael.node)
            
            var clicker = this.clicker
            
            if (clicker) {
                if (!this.clickerNode) this.clickerNode = Ext.get(clicker.node)
                
                var clickerNode = this.clickerNode
                
                clickerNode.set({ 
                    'class' : 'sh-element',
                    'uuid'  : this.uuid
                })
                clickerNode.setStyle('cursor', 'move')
            }
        },
        
        
        onAttributeMutate : function (event, mutation) {
            throw "Abstract method called"
        },
        
        
        getStyle : function (attr) {
            var viewProp = (this.model.status == 'draft' ? 'draft' : 'element') + Joose.S.uppercaseFirst(attr)
            
            return this.getBoard().view[ viewProp ]
        },
        
        
        updateStyle : function () {
            this.raphael.attr({
                opacity             : this.getStyle('opacity'),
                stroke              : this.model.getColor(),
                'stroke-dasharray'  : this.getStyle('dashing'),
                'stroke-width'      : this.getStyle('width')
            })
        },
        
        
        updatePosition : function () {
            throw "Abstract method called"
        },
        
        
        select : function () {
            if (this.isSelected) return
            
            this.INNER()
            
            this.isSelected = true
        },
        
        
        deselect : function () {
            if (!this.isSelected) return
            
            this.INNER()
            
            this.isSelected = false
        },
        
        
        remove : function () {
            if (this.isSelected) this.deselect()
            
            this.raphael.remove()
            
            this.clicker && this.clicker.remove()
        }
    }
})

