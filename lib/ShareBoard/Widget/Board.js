Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Panel,
    
    does    : 'Symbie.Widget',
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        }
    ],
    
    
    id : {
        boardID     : { required : true }
    },
    
    
    has : {
        paper       : null,
        
        board       : null,
        
        trackMouseEvents : {
            init : [
                'mousedown',
                'mouseup',
                
                'click',
                'dblclick',
                
                'mousemove',
                
                'mouseover',
                'mouseout'
            ]
        },
        
        drawTools       : null,
        currentTool     : null,
        
        widgetsByUUID   : Joose.I.Object,
        
        channel         : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            var channel = this.channel = new Faye.Client('http://local/8080/faye')
            
            channel.subscribe('/draw', this.draw.createDelegate(this))
            
            var currentBoard = ShareBoard().board
            
            if (currentBoard && currentBoard.uuid == this.boardID) this.board = currentBoard
            
            
            this.setupBoard()
            
            
            var drawTools = this.drawTools = {}
            
            ShareBoard.Widget.Board.Tool.each(function (toolClass, id) {
                drawTools[ id ] = new toolClass({
                    boardWidget : this
                })
            }, this)
            
            
            this.addEvents.apply(this, this.trackMouseEvents)
            
            Ext.apply(this, {
                
                title : 'ShareBoard draw area',
                
                height : 800,
                
                bodyCssClass : 'ShareBoard-Board',
                
                tbar : [
                    {
                        text            : 'Line',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        pressed         : true,
                        allowDepress    : false,
                        
                        toolID          : 'line',
                        
                        toggleHandler   : this.toolToogled,
                        scope           : this
                    },
                    '-',
                    {
                        text            : 'Circle',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        allowDepress    : false,
                        
                        toolID          : 'circle',
                        
                        toggleHandler   : this.toolToogled,
                        scope           : this
                    },
                    '-',
                    {
                        text            : 'Curve',
                        
                        enableToggle    : true,
                        toggleGroup     : 'tools',
                        
                        allowDepress    : false,
                        
                        toolID          : 'curve',
                        
                        toggleHandler   : this.toolToogled,
                        scope           : this
                    },
                    '-',
                    {
                        text            : 'Scale',
                        
                        handler         : function () { this.paper.scale(0.5) },
                        scope           : this
                    }
                ]
            })
        }
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var body    = this.body
            
            this.paper = Raphael(body.dom, '100%', '100%')
            
            
            var me = this
            
            Joose.A.each(this.trackMouseEvents, function (event) {
                
                body.relayEvent(event, me)
            })
            
//            this.drawTools.cursor.activate()
            
            this.activateTool('line')
        }
    },
            
            
    methods : {
        
        addWidget : function (widget) {
            this.widgetsByUUID[ widget.uuid ] = widget
        },
        
        
        setupBoard : function () {
            var board = this.board
            
            board.on('element', this.onNewElement, this)
            
            board.on('mutate', this.onElementMutate, this)
            
            board.channel = this.channel
        },
        
        
        onNewElement : function (element) {
            
            var widgetClass = element.widgetClass
            
            if (widgetClass) { 
            
                var widget = new widgetClass({
                    
                    boardWidget : this,
                    board       : this.board,
                    model       : element
                })
                
                this.addWidget(widget)
                
                widget.render()
            }
            
//            this.channel.publish('/draw', element)
        },
        
        
        onElementMutate : function (element, packet, options) {
            
            this.channel.publish('/draw', {
                
                sender  : this.uuid,
                packet  : packet,
                options : options
            })
        },
        
        
        draw : function (message) {
            if (message.sender == this.uuid) return
            
            console.log(JSON.stringify(step))
            
            var packet  = message.packet
            var options = message.options
            
            if (options.initial) {
                var constructor = eval(packet.className)
                
                var element = new constructor()
                
                element.mutateSilently(packet, options)
                
                this.addWidget(element)
            } else {
                
                var element = this.widgetsByUUID[ element.uuid ]
                
                element.mutateSilently(packet, options)
            }
        },
        
        
        getTool : function (toolID) {
            return this.drawTools[ toolID ]
        },
        
        
        activateTool : function (toolID) {
            var currentTool = this.currentTool
            
            if (currentTool) this.getTool(currentTool).deActivate()
            
            this.currentTool = toolID
            
            this.getTool(toolID).activate()
        },
        
        
        toolToogled : function (button, state) {
            if (state) this.activateTool(button.toolID)
        },
        
        
        publishStep : function (step) {
            this.channel.publish('/draw', step)
        }
    },
    
    
//    remote : {
//        
//        methods : {
//            getBoard : {
//                url : '/board/fetch'
//            }
//        }
//    },
    
    continued : {
        
        methods : {
            
            setup : function () {
                if (this.board) {
                    this.CONTINUE()
                    
                    return
                }
                
                this.getBoard(this.boardID).andThen(function (board) {
                    
                    ShareBoard().board = this.board = board
                })
                
                //XXX fetch existed board
                console.log('XXX fetch existed board')
            }
            
        }
    }
    
})