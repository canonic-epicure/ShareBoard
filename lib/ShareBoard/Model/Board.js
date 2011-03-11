Module('ShareBoard.Model.Board', {
  
    use            : [
        'Syncler',
        'Syncler.Topic.UUID',
        'ShareBoard.Model.Board.View',
        
        'ShareBoard.Model.Board.Element.Cursor'
    ],
    
    
body : function () {
    

    Class('.ShareBoard.Model.Board', {
        
        does            : [
            Syncler.Topic.UUID
        ],
        
        
        has : {
            createdBy       : null,
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
            },
            
            
            buildOwnFlash : function () {
                var ownFlash    = new Syncler.Composite.Object({ replica : this.replica })
                
                var user        = new ShareBoard.Model.User({
                    replica     : this.replica,
                    
                    host        : this.FLASH
                })
                
                ownFlash.set('user', user)
                
                ownFlash.set('cursor', new ShareBoard.Model.Board.Element.Cursor({
                    belongsToUser   : user,
                    
                    x           : 0,
                    y           : 0,
                    
                    visible     : false,
                    
                    board       : this,
                    replica     : this.replica
                }))
                
                return ownFlash
            },
            
            
            remove : function (element) {
                this.elementsByUUID.remove(element.uuid)
            }
        }
    })
    
}})