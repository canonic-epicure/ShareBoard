Class('ShareBoard.Model.Board', {
    
    meta    : Joose.Meta.Class,
    
    isa     : Ext.util.Observable,
    
    
    use     : 'Data.UUID',
    
    
    has : {
        
        uuid            : Joose.I.UUID,
        
        elementsByUUID  : Joose.I.Object,
        
        drawSteps       : Joose.I.Array,
        
        
        createdAt       : Joose.I.Now,
        createdBy       : null
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
