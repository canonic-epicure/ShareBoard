Role('Vero.Meta', {
    
    use : [ 
        'Vero.Object',
        'Vero.Mutation.Create'
    ],
    
    
    has : {
        veroObjectClass     : Joose.I.FutureClass('Vero.Object')
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
    
    
    
    override : {
        
        initInstance : function (instance, config) {
            
            var VERO = instance.VERO = new this.veroObjectClass({
                object : instance
            })
            
            VERO.addMutation(new Vero.Mutation.Create({
                className : instance.meta.name
            }))
            
            this.SUPER(instance, config)
            
            VERO.commit('create')
        }
    }
})

