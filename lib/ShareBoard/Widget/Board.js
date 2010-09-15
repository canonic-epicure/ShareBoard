Class('ShareBoard.Widget.Board', {
    
    isa     : Ext.Panel,
    
    does    : 'Symbie.Widget',
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        }
//        ,
//        {
//            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
//            presence    : 'Faye'
//        }
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
            
            var me      = this
            
            var currentBoard = ShareBoard().board
            
            if (currentBoard) {
                this.board      = currentBoard
                    
                this.channel    = ShareBoard().channel
                
                this.setupChannel(this.channel)
            }

            
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
            
            this.drawBoard()
        }
    },
            
        
    
    methods : {
        
        drawBoard : function () {
            var me      = this
            var board   = this.board
            
            console.log('drawboard')
            
            board.each(function (element) {
                
                console.log('draw element')
                
                me.onNewElement(board, element, true)
            })
        },
        
        
        addWidget : function (widget) {
            this.widgetsByUUID[ widget.uuid ] = widget
        },
        
        
        setupChannel : function (channel) {
            
            //incoming
            channel.on('mutation', this.onMutation, this)
            
            channel.on('/board/element/new', this.onNewElement, this)
            
            channel.on('/channel/object/commit', this.onObjectMutate, this)
        },
        

        
        //incoming
        onMutation : function (channel, instance, packet) {
            
            if (packet.at(0) instanceof Syncler.Vero.Mutation.Create) {
                
                this.onNewElement(this.board, instance, true)
                
            } else {
                
                this.onObjectMutate(channel, instance, packet, null, true)
            }
        },
        
        
        onNewElement : function (board, element, skipChannelCommit) {
            var widgetClass = eval(element.widgetClass)
            
            if (widgetClass) { 
            
                var widget = new widgetClass({
                    boardWidget : this,
                    board       : this.board,
                    model       : element
                })
                
                this.addWidget(widget)
                
                console.log('render widget')
                
                widget.render()
                
                if (!skipChannelCommit) board.channel.commit()
            }
        },
        
        
        onObjectMutate : function (channel, object, packet, vero, skipChannelCommit) {
            
            if (packet.at(0) instanceof Syncler.Vero.Mutation.Create) return
            
            if (object instanceof ShareBoard.Model.Board.Element) {
                
                var uuid = object.uuid
                
                console.log('mutation: ' + uuid, 'widget : ' + this.widgetsByUUID[ uuid ])
                
                this.widgetsByUUID[ uuid ].onMutate(channel, object, packet)
                
                if (!skipChannelCommit) channel.commit()
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
        
        
        publishStep : function () {
            this.channel.commit()
        }
    },
    
    
    
    continued : {
        
        methods : {
            
            setup : function () {
                if (this.board) {
                    this.CONTINUE()
                    
                    return
                }
                
                var me = this
                
                ShareBoard().syncler.establishChannel(this.boardID).andThen(function (channel) {
                    
                    me.board        = channel.getTopic()
                    me.channel      = channel
                    
                    me.setupChannel(channel)
                    
                    this.CONTINUE()
                })
            }
            
        }
    }
    
})