Class('ShareBoard.Model.Board', {
    
    does    : 'KiokuJS.Feature.Class.OwnID',
    
    
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
        
        acquireID : function () {
            return this.uuid
        },
        
        
        addElement : function (element) {
            
            this.elementsByUUID[ element.uuid ] = element
        },
        
        
        addDrawStep : function (step) {
            
            this.drawSteps.push(step)
        }
    }
})
