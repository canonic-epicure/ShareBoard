Module('ShareBoard.Model.Board', {
  
    use            : [
        'Syncler',
        'Syncler.Topic.UUID',
        'ShareBoard.Model.Board.View'
    ],
    
    
body : function () {
    

    Class('.ShareBoard.Model.Board', {
        
        does            : [
            Syncler.Topic.UUID
        ],
        
        
        has : {
            createdAt       : Joose.I.Now,
            
            elementsByUUID  : Syncler.I.Object,
            
            view            : null
        },
        
        
        methods : {
            
            initialize : function () {
                this.view = new ShareBoard.Model.Board.View({
                    replica : this.replica
                })
            },
            
            
            addElement : function (element) {
                this.elementsByUUID.set(element.uuid, element)
            },
            
            
            each : function (func, scope) {
                return this.elementsByUUID.each(func, scope || this)
            }
        }
    })


}})