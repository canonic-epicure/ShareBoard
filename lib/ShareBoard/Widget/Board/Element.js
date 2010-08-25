Class('ShareBoard.Widget.Board.Element', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    use     : 'Data.UUID',
    
    
    has : {
        element         : null,
        
        boardWidget     : { required : true },
        
        layerX          : { required : true },
        layerY          : { required : true },
        
        
//        isPressed       : false,
        
        raphaelNode     : null,
        el              : null
    },
    
    
    methods : {
        
        initialize : function () {
            
            this.addEvents('drawstep')
            
            
            this.element = this.createBoardElement()
            
            this.render()
            
            this.afterRender()
        },
        
        
        createBoardElement : function () {
            throw "Abstract method `createBoardElement` called for [" + this + "]"
        },
        
        
        render : function () {
            throw "Abstract method `render` called for [" + this + "]"
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        afterRender : function () {
            var el = this.el = Ext.get(this.raphaelNode.node)
            
//            debugger
            
            el.on('mousedown', this.onMouseDown, this)
            el.on('mousemove', this.onMouseMove, this)
            el.on('mouseup', this.onMouseUp, this)
            
            el.on('mouseover', this.onMouseOver, this)
            el.on('mouseout', this.onMouseOut, this)
        },
        
        
        destroy : function () {
            var el = this.el
            
            el.un('mousedown', this.onMouseDown, this)
            el.un('mousemove', this.onMouseMove, this)
            el.un('mouseup', this.onMouseUp, this)
            
            el.un('mouseover', this.onMouseOver, this)
            el.un('mouseout', this.onMouseOut, this)
        },
        
        
        onMouseDown : function (e) {
//            this.isPressed  = true
        },
        
        
        onMouseUp : function (e) {
//            this.isPressed  = false
        },
        
        
        onMouseMove : function (e) {
            console.log('on mouse move')
        },
        
        
        onMouseOver : function (e) {
        },
        
        
        onMouseOut : function (e) {
        },
        
        
        onExternalMouseMove : function (layerX, layerY) {
        },
        
        
        onExternalMouseUp : function (layerX, layerY) {
        }
        
    }
    
})
