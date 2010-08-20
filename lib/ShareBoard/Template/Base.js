Class('ShareBoard.Template.Base', {
    
    isa : 'Shotenjin.Joosed.Template',
    
    does : [ 'SymbieX.Template.Shotenjin' ],
    
    
    use : [ 'ShareBoard.Router' ],
    
    //render helpers common for whole application
    methods : {
        
        
        // need to provide 'getRoute' implementation to stringify <a/> links
        // probably should be switched to something simpler and auto-configurable
        getRoute : function (name) {
            return ShareBoard.Router.meta.getRoute(name)
        }
    }
    
})