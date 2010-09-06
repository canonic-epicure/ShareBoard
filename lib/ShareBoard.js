Class('ShareBoard', {
    
    trait : 'JooseX.Class.Singleton',
    
    isa : 'Symbie.Application',
    
    use : [ 
        'ShareBoard.Widget.Root',
        'KiokuJS',
        'Syncler'
    ],
    
    
    
    has : {
        ID                  : 'ShareBoard',
        
        staticPrefix        : '../../lib/ShareBoard/static/',
        
        board               : null,
        
        syncler             : null
    },
    
    
    methods : {
        
        initialize : function () {
            
            this.syncler = new Syncler({
                baseURL     : 'http://local/syncler'
            })
        },
        
        
        seed : function () {
            this.root = new ShareBoard.Widget.Root({
                owner : this
            })
        },
        
        
        pathToStatic : function (file) {
            return this.staticPrefix.replace(/\/?$/, '') + '/' + file.replace(/^\/?/, '')
        },
        
        
        hasBoard    : function () {
            return this.board != null
        }
    }
})

