Class('ShareBoard.Model.Board', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
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
