Class('ShareBoard.Model.Board', {
    
    trait       : 'Syncler.Hub',
    
    does         : [ 
        'KiokuJS.Feature.Class.OwnUUID'
//        'JooseX.Observable', //?
    ],
    
    
    has : {
        createdAt       : Joose.I.Now,
        owner           : { required : true }
    },
        

    vero : {
        elementsByUUID  : Joose.I.Object,
        views           : Joose.I.Object
    },
    
    
    methods : {
        
        initialize : function () {
        },
        
        
        getChannelName  : function () {
            return '/board/' + this.uuid
        },
        
        
        addElement : function (element) {
            this.elementsByUUID[ element.uuid ] = element
            
//            this.fireEvent('element', element)
        }
    }
})
