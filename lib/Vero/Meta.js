Role('Vero.Meta', {
    
    use : [ 
        'Vero.Object' 
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
            
            instance.VERO = new this.veroObjectClass({
                object : instance
            })
            
            this.SUPER(instance, config)
            
            instance.VERO.commit('create')
        }
    }
})

