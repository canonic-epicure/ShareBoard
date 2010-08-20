Class('ShareBoard.Widget.Header', {
    
    use : [ 
        'inturl://ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
        
        'ShareBoard.Control.NavigationButton' 
    ],
    
    
    isa : Ext.Container,
    
    
    has : {
        style                   : 'position : relative',
        
        canvas                  : null,
        
        buttons                 : Joose.I.Object,
        
        activeButton            : null
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var canvas = this.canvas = Raphael(this.el.dom, '100%', '100%')
            
            var buttons         = this.buttons
//            var urls            = JOOSE_IT_BUTTONS
//            
//            var title           = canvas.image(urls.logo.src, 352, 10, 276, 50)
//            
//            
//            buttons.home        = new ShareBoard.Control.NavigationButton({
//                src         : urls.home.src,
//                activeSrc   : urls.home.activeSrc,
//                
//                dispatchTo  : '/home',
//                
//                left        : 45,
//                top         : 50,
//                
//                rotation    : 20,
//                
//                canvas      : canvas
//            })
//
//            
//            buttons.about       = new ShareBoard.Control.NavigationButton({
//                src         : urls.about.src,
//                activeSrc   : urls.about.activeSrc,
//                
//                dispatchTo  : '/about',
//                
//                left        : 215,
//                top         : 90,
//                
//                rotation    : -18,
//                
//                canvas      : canvas
//            })            
//            
//            
//            buttons.download    = new ShareBoard.Control.NavigationButton({
//                src         : urls.download.src,
//                activeSrc   : urls.download.activeSrc,
//                
//                dispatchTo  : '/download',
//                
//                left        : 385,
//                top         : 110,
//                
//                rotation    : 0,
//                
//                canvas      : canvas
//            })
//            
//            
//            buttons.blog       = new ShareBoard.Control.NavigationButton({
//                src         : urls.blog.src,
//                activeSrc   : urls.blog.activeSrc,
//                
//                dispatchTo  : function () {
//                    window.location = '/blog'
//                },
//                
//                left        : 555,
//                top         : 90,
//                
//                rotation    : 21,
//                
//                canvas      : canvas
//            })
//            
//            
//            buttons.resources       = new ShareBoard.Control.NavigationButton({
//                src         : urls.resources.src,
//                activeSrc   : urls.resources.activeSrc,
//                
//                dispatchTo  : '/resources',
//                
//                left        : 725,
//                top         : 40,
//                
//                rotation    : -20,
//                
//                canvas      : canvas
//            })
//            
//            buttons.about.self.insertBefore(buttons.home.self)
//            
//            if (this.activeButton) {
//                var activeButton = this.activeButton = buttons[this.activeButton]
//                activeButton.activate()
//            }
//            
//
//            Joose.O.each(this.buttons, function (button) {
//                button.on('mouseover', button.scale.createDelegate(button, []))
//                button.on('mouseover', this.backscaleButtonsExcept, this)
//                
//                button.on('mouseout', this.restoreAllScales, this)
//            }, this)
        }
        
    },
    
    
    methods : {
        
        backscaleButtonsExcept : function (button) {
            Joose.O.each(this.buttons, function (otherButton) {
                if (otherButton != button) otherButton.backscale()
            })
        },
        
        
        restoreAllScales : function () {
            Joose.O.each(this.buttons, function (button) {
                button.restoreScale()
            })
        },
        
        
        setActivePage : function (pageId) {
//            if (!this.rendered) {
//                this.activeButton = pageId
//                
//                return
//            }
//            
//            if (this.activeButton) this.activeButton.deactivate()
//            
//            this.activeButton = this.buttons[pageId]
//            
//            this.activeButton.activate()
        }
        
    }
    
})