StartTest(function(t) {
    
    //======================================================================================================================================================================================================================================================
    t.diag('Sanity')
    
    t.ok(Vero.Object, "Vero.Object is here")

    
    //======================================================================================================================================================================================================================================================
    t.diag('Class declaration')
    
    
    Class('TestClass', {
        
        trait   : Vero.Meta,
        
        does    : Vero.Role,
        
        
        has : {
            attr1 : {
                trait : Vero.Meta.Attribute,
                
                init    : 'attr1'
                
            },
            
            attr2 : {
                trait : Vero.Meta.Attribute
            },
            
            
            attr3 : {
                trait : Vero.Meta.Attribute
            }
        }
        
    })
    
    
    t.ok(TestClass, 'TestClass is here')

    
    //======================================================================================================================================================================================================================================================
    t.diag('Instantiation')
    
    var test = new TestClass({
        attr2    : 'attr2',
        attr3   : 'attr3'
    })
    
    
    var VERO = test.VERO
    
    t.ok(VERO, 'Vero instance was attached')
    
    t.ok(VERO.history.length == 1, 'History has 1 packet')
    
    t.ok(VERO.history[0] instanceof Vero.Mutation.Packet, 'History has 1 *packet*, indeed')
    
    
    var packet = VERO.history[0]
    
    t.ok(packet.length() == 2, 'Packet has 2 mutations')

    //======================================================================================================================================================================================================================================================
    t.diag('Instantiation')
        
        
    t.done()
})    
