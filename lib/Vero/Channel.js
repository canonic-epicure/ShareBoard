Class('Vero.Channel', {
    
    meta        : Joose.Meta.Class,
    
    isa         : Ext.util.Observable,
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        }
    ],
    
    
    
    has : {
        fayeClient              : null,
        uuid                    : Joose.I.UUID,
        
        url                     : null,
        options                 : null,
        
        objects                 : Joose.I.Object,
        
        
        queue                   : Joose.I.Array
    },
    
    
    methods : {
        
        initialize : function () {
            this.fayeClient = new Faye.Client(this.url, this.options)
        },
        
        
        register : function (object) {
//            this.objects[ object.uuid ] = object
            
            object.on('mutation', this.onObjectMutation, this)
        },
        
        
        onObjectMutation : function (object, mutation) {
        
        },
        
        
        commit      : function () {
        }
    }
})

