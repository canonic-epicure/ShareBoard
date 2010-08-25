COMPONENTS = {
    // a comment
    
    "Core" : [
        "ShareBoard.Model.Board",
        "ShareBoard.Model.Board.Element",
        "ShareBoard.Model.Board.Element.Path",
        "ShareBoard.Model.Board.Element.Circle",
    
        "ShareBoard.Control.NavigationButton",
        
        "ShareBoard.Widget.Footer",
        "ShareBoard.Widget.Header",
        "ShareBoard.Widget.Home",
        "ShareBoard.Widget.NotFound",
        
        "ShareBoard.Router",
        
        "ShareBoard.Widget.Root",
        
        "ShareBoard.Widget.Board",
        "ShareBoard.Widget.Board.Element",
        "ShareBoard.Widget.Board.Element.Path",
        "ShareBoard.Widget.Board.Element.Circle",
        
        "ShareBoard.Layout.Centered",
        "ShareBoard.Layout.Site",
        "ShareBoard"
    ],
    
    
    "Bundle" : [
        "jsan:Task.Symbie.Bundle",
        
        {
            "text" : "JooseX.Namespace.Depended.Manager.my.INC = [ '/jsan', '../../lib' ]"
        },
        
        "+Core"
    ]
}
