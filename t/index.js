var Harness
var isNode        = typeof process != 'undefined' && process.pid

if (isNode) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else 
    Harness = Test.Run.Harness.Browser.ExtJS
        
    
var INC = (isNode ? require.paths : []).concat('../lib', '/jsan')


Harness.configure({
    title     : 'ShareBoard Test Suite',
    
    preload : Joose.is_NodeJS ? [
//        "jsan:Task.Joose.Core",
//        "jsan:Task.JooseX.Namespace.Depended.NodeJS",
//        {
//            text : "JooseX.Namespace.Depended.Manager.my.INC = " + JSON.stringify(INC)
//        }
        
    ] : [
        "Task.ShareBoard.Bundle",
        "Task.ShareBoard.Vero",
        {
            text : "JooseX.Namespace.Depended.Manager.my.INC = " + Ext.encode(Harness.absolutizeINC(INC))
        }
    ]
})


Harness.start(
    '010_sanity.t.js',
    '020_vero_basic.t.js'
)

