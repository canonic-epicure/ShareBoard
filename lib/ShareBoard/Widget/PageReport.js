Role('ShareBoard.Widget.PageReport', {
    
    has : {
        pageId      : null
    },
    

    before : {
        initComponent : function () {
            this.addEvents('currentPage')
            this.enableBubble('currentPage')
        }
    },
    
    
    after : {
        
        touch : function () {
            this.fireEvent('currentPage', this)
        }
    }
    
})