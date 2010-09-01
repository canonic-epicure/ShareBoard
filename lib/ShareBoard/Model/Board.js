Class('ShareBoard.Model.Board', {
    
    meta        : Joose.Meta.Class,
    
    // XXX JooseX.Observable
    isa         : Ext.util.Observable,
    
    does    : 'KiokuJS.Feature.Class.OwnID',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        elementsByUUID  : Joose.I.Object,
        drawSteps       : Joose.I.Array,
        
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        
        width           : null,
        height          : null,
        
        fayeClient      : null,
        
        currentColor    : null,
        currentWidth    : 2
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('element', 'step')
        },
        
        
        acquireID : function () {
            return this.uuid
        },
        
        
        addElement : function (element) {
            
            this.elementsByUUID[ element.uuid ] = element
            
            this.fireEvent('element', element)
        },
        
        
        addDrawStep : function (step) {
            
            this.drawSteps.push(step)
            
            this.fireEvent('step', step)
        }
    }
})
