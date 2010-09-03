Class('ShareBoard.Model.Board', {
    
    meta        : Joose.Meta.Class,
    
    // XXX JooseX.Observable
    isa         : Ext.util.Observable,
    
    does    : 'KiokuJS.Feature.Class.OwnID',
    
    trait       : 'Vero',
    
    
    has : {
        uuid            : Joose.I.UUID,
        
        elementsByUUID  : Joose.I.Object,
        
        createdAt       : Joose.I.Now,
        createdBy       : null,
        
        
        width           : null,
        height          : null,
        
        fayeClient      : null,
        
        phantomOpacity  : 0.2,
        phantomDashing  : "- ",
        phantomColor    : 'green',
        phantomWidth    : 2,
        
        currentColor    : 'blue',
        currentDashing  : '',
        currentWidth    : 2,
        
        channel         : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.addEvents('element')
        },
        
        
        acquireID : function () {
            return this.uuid
        },
        
        
        addElement : function (element) {
            
            this.elementsByUUID[ element.uuid ] = element
            
            this.fireEvent('element', element)
        }
    }
})
