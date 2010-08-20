Class('ShareBoard.Control.NavigationButton', {
    meta : Joose.Meta.Class,
    
    isa : Ext.util.Observable,
    
    
    has : {
        
        src         : null,
        activeSrc   : null,
        
        left        : null,
        top         : null,
        
        width       : null,
        height      : null,
        
        rotation    : 0,
        
        dispatchTo  : null,
        
        canvas      : {
            required    : true
        },
        
        self        : null,
        
        hasMouse    : false,
        
        
        
        scaleTime        : 500,
        scaleFactor      : 1.15,
        scaleEasing      : 'elastic'
    },
    
    
    after : {
        
        initialize : function () {
            this.addEvents('mouseover', 'mouseout')
            
            if (!this.isDataUri(this.src)) this.src = JooseIt().pathToStatic(this.src)
            
            this.activeSrc      = this.activeSrc || this.src.replace(/\.png$/, '-color.png')
            
            this.width          = this.width || 223
            this.height         = this.height || 221
            
            var self = this.self = this.canvas.image(this.src, this.left, this.top, this.width, this.height).attr({ rotation : this.rotation })
            
            Ext.fly(self.node).on('mouseover', this.onMouseOver, this)
            Ext.fly(self.node).on('mouseout', this.onMouseOut, this)
            Ext.fly(self.node).on('click', this.onClick, this)
        }
    },
    
    
    methods : {
        
        isDataUri : function (src) {
            return /^data:image/.test(src) || /^mhtml:http/.test(src)
        },
        
        
        onClick : function () {
            if (typeof this.dispatchTo == 'string') 
                JooseIt().dispatch(this.dispatchTo).now()
            else
                this.dispatchTo.call(this)
        },
        
        
        onMouseOver : function () {
            this.hasMouse = true
            
            this.fireEvent('mouseover', this)
        },
        
        
        onMouseOut : function () {
            this.hasMouse = false
            
            this.fireEvent('mouseout', this)
        },
        
        
        scale   : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : scaleFactor || this.scaleFactor }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        backscale : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : scaleFactor || 1 / this.scaleFactor }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        restoreScale : function (scaleFactor, scaleTime, scaleEasing, callback) {
            this.self.animate({ scale : 1 }, scaleTime || this.scaleTime, scaleEasing || this.scaleEasing, callback)
        },
        
        
        resetScale : function () {
            this.self.scale(1, 1)
        },
        
        
        activate : function () {
            this.self.attr('src', this.activeSrc)
            
            var me = this
            
            if (!this.hasMouse) this.scale(null, 100, 'backIn', function () {
                me.restoreScale(null, 100, 'backIn')
            })
        },
        
        
        deactivate : function () {
            this.self.attr('src', this.src)
        }
       
    }

})
