Role('Vero', {
    
    use : [ 
        'Vero.Role',
        'Vero.Object',
        'Vero.Mutation.Create'
    ],
    
    
    has : {
    },
    
    
    methods : {
        
//        seed : function () {
//            this.root = new ShareBoard.Widget.Root({
//                owner : this
//            })
//        },
//        
//        
//        pathToStatic : function (file) {
//            return this.staticPrefix.replace(/\/?$/, '') + '/' + file.replace(/^\/?/, '')
//        },
//        
//        
//        hasBoard    : function () {
//            return this.board != null
//        }
    },
    
    
    after : {
        
        processStem : function () {
            this.addRole(Vero.Role)
        }
    },
    
    
    
    
    override : {
        
        initInstance : function (instance, config) {
            
            var VERO = instance.VERO = new Vero.Object({
                object      : instance,
                
                channel     : config.channel
            })
            
            var creation = new Vero.Mutation.Create({
                className   : instance.meta.name,
                
                objectUUID  : VERO.UUID // XXX instance.acquireID()
            })
            
            VERO.addMutation(creation)
            
            this.SUPER(instance, config)
            
            VERO.commit()
        }
    }
})

