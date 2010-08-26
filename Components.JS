COMPONENTS = {
    // a comment
    
    "Core" : [
        "ShareBoard.Model.Board",
        "ShareBoard.Model.Board.Element",
        "ShareBoard.Model.Board.Element.Path",
        "ShareBoard.Model.Board.Element.Circle",
    
        "ShareBoard.Control.NavigationButton",
        
        "ShareBoard.Widget.Role.LocalEvent",
        
        "ShareBoard.Widget.Footer",
        "ShareBoard.Widget.Header",
        "ShareBoard.Widget.Home",
        "ShareBoard.Widget.NotFound",
        
        "ShareBoard.Router",
        
        "ShareBoard.Widget.Root",
        
        "ShareBoard.Widget.Board",
        "ShareBoard.Widget.Board.Tool",
        "ShareBoard.Widget.Board.Tool.Line",
        "ShareBoard.Widget.Board.Tool.Circle",
        "ShareBoard.Widget.Board.Tool.Cursor",
        "ShareBoard.Widget.Board.Tool.Curve",
        
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
