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
        
        syncler         : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            var me      = this
            var channel = this.channel = new Faye.Client('http://local/8080/faye', {
                interval    : 1000 / 1000
            })
            
            
            channel.subscribe('/draw', function () {
                
                me.draw.defer(1, me, arguments)
            })
            
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
            
            var widgetClass = eval(element.widgetClass)
            
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
            options = options || {}
            
            if (options.external) return
            
            this.channel.publish('/draw', {
                
                sender  : this.boardID,
                packet  : packet,
                options : options
            })
        },
        
        
        draw : function (message) {
            if (message.sender == this.boardID) return
            
            console.log(JSON.stringify(message))
            
            var packet  = message.packet
            var options = message.options || {}
            
            if (options.initial) {
                var constructor = eval(packet.className)
                
                packet.isShadow = true
                packet.board    = this.board
                
                var element = new constructor(packet)
                
                this.board.addElement(element)
            } else {
                
                var element = this.board.elementsByUUID[ packet.uuid ]
                
                options.external = true
                
                element.mutate(packet, options)
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
    
    
    
    continued : {
        
        methods : {
            
            setup : function () {
                if (this.board) {
                    this.CONTINUE()
                    
                    return
                }
                
                this.syncler.get(this.boardID).andThen(function (board) {
                    
                    this.board = board
                    
                    this.CONTINUE(board)
                    
                }, this)
            }
            
        }
    }
    
})