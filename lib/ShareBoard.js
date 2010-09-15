Class('ShareBoard', {
    
    trait : 'JooseX.Class.Singleton',
    
    isa : 'Symbie.Application',
    
    use : [ 
        'ShareBoard.Widget.Root',
        'KiokuJS', // XXX need to include 'KiokuJS' for Joose.O.each override (move to Data.Visitor?)
        'Syncler'
    ],
    
    
    
    has : {
        ID                  : 'ShareBoard',
        
        staticPrefix        : '../../lib/ShareBoard/static/',
        
        board               : null,
        
        syncler             : null,
        
        channel             : null
    },
    
    
    methods : {
        
        initialize : function () {
            
            this.syncler = new Syncler({
                fayeURL         : 'http://local/9000/faye',
                baseURL         : 'http://local/9000'
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

