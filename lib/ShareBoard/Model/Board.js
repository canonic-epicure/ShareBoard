Class('ShareBoard.Model.Board', {
    
    trait       : 'Syncler.Vero.Meta',
    
    does         : [
        'Syncler.Vero.Role.Topic',
        'KiokuJS.Feature.Class.OwnUUID'
    ],
    
    
    use     : "ShareBoard.Model.Board.View",
    
    
    has : {
        createdAt       : Joose.I.Now
    },
        

    sync : {
        elementsByUUID  : Joose.I.Object,
        
        view            : null
//        views           : Joose.I.Object
    },
    
    
    methods : {
        
        initialize : function () {
            this.view = new ShareBoard.Model.Board.View({
                channel : this.channel
            })
        },
        
        
        getChannelName  : function () {
            return '/board/' + this.uuid
        },
        
        
        addElement : function (element) {
            this.elementsByUUID[ element.uuid ] = element
            
            this.setElementsByUUID(Joose.O.copy(this.elementsByUUID))
            
            this.commit()
            
            this.channel.fireEvent('/board/element/new', this, element)
        },
        
        
        getTopicID : function () {
            return this.uuid
        },
        
        
        each : function (func, scope) {
            return Joose.O.each(this.elementsByUUID, func, scope || this)
        }
    }
})
