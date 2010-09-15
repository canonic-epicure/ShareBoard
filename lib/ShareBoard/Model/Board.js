Class('ShareBoard.Model.Board', {
    
    trait       : 'Syncler.Vero.Meta',
    
    does         : [
        'Syncler.Vero.Role.Topic',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    has : {
        createdAt       : Joose.I.Now
    },
        

    sync : {
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
            
            this.channel.fireEvent('/board/element/new', this, element)
        },
        
        
        getTopicID : function () {
            return this.uuid
        }
    }
})
