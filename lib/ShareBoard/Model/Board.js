Class('ShareBoard.Model.Board', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    use     : 'Data.UUID',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        elementsByUUID  : Joose.I.Object,
        drawSteps       : Joose.I.Array,
        
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        
        width           : null,
        height          : null,
        
        
        fayeClient      : null
    },
    
    
    methods : {
        
        addElement : function (element) {
            
            this.elementsByUUID[ element.uuid ] = element
        },
        
        
        addDrawStep : function (step) {
            
            this.drawSteps.push(step)
        }
    }
})


//            var fayeClient = this.fayeClient = new Faye.Client('http://local:8000/faye')
//            
//            fayeClient.subscribe('/draw', this.onDrawLine.createDelegate(this))
