COMPONENTS = {
    
    "Model" : [
        "ShareBoard.Model.Board.View",
    
        "ShareBoard.Model.Board",
        "ShareBoard.Model.Board.Element",
        "ShareBoard.Model.Board.Element.Line",
        "ShareBoard.Model.Board.Element.Circle"
    ],
    
    
    "Core" : [
        "+Model",
        
        "ShareBoard.Role.LocalEvent",

        "ShareBoard.Widget.Footer",
        "ShareBoard.Widget.Header",
        "ShareBoard.Widget.Home",
        "ShareBoard.Widget.NotFound",
        
        "ShareBoard.Widget.Root",
        
        "ShareBoard.View.Board.Element",
        "ShareBoard.View.Board.Element.Line",
        
        "ShareBoard.View.Board",
        
        "ShareBoard.View.Tool",
        "ShareBoard.View.Tool.Line",
        
        "ShareBoard.Layout.Centered",
        "ShareBoard.Layout.Site",
        "ShareBoard"
    ],
    
    
//    "Prereq" : [
//        "jsan:Task.Symbie.Bundle",
//        {
//            "text" : "JooseX.Namespace.Depended.Manager.my.INC = [ '/jsan', '../../lib' ]"
//        },
//
//        "jsan:Data.UUID",
//        
//        "jsan:Shotenjin.Joosed.Template",
//        "jsan:Task.SymbieX.Template.Shotenjin.Core",
//        
//        "=static/deps/raphael/raphael-min-1.5.0.js",
//        
//        "jsan:Johnny.Mnemonic",
//        "jsan:SymbieX.History.Router",
//        
//        "jsan:JooseX.Class.Singleton",
//        
//        
//        "jsan:Task.HTTP.Request.Provider.Auto",
//        
//        "jsan:Data.Visitor",
//        "jsan:Task.JSON2.Bundle",
//        "jsan:Task.JooseX.Observable.Core",
//        
//        "jsan:Task.KiokuJS.Core",
//        "jsan:Task.KiokuJS.Backend.CouchDB.Core",
//        "jsan:Task.Syncler.Core"
//    ],
    
    
    
    "Bundle" : [
//        "+Prereq",
        
        "+Core"
    ]
}
