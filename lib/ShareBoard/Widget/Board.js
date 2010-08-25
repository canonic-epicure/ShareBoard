Class('ShareBoard.Widget.Board', {
    
    isa : Ext.Panel,
    
    
    does : 'Symbie.Widget',
    
    
    use : [
        {
            token       : 'ShareBoard/static/deps/raphael/raphael-min-1.5.0.js',
            presence    : 'Raphael'
        },
        {
            token       : 'ShareBoard/static/deps/faye/faye-browser.js',
            presence    : 'Faye'
        },
        
        'Data.UUID',
        'ShareBoard.Widget.Board.Element.Path',
        
        
        'ShareBoard.Model.Board'
    ],
    
    
    has : {
        paper       : null,
        
        downX       : null,
        downY       : null,
        
        currX       : null,
        currY       : null,
        
        threshold   : 10,
        
        isPressed   : false,
        
        fayeClient  : null,
        
        
        board       : null
    },
    
    
    
    before : {
        
        initComponent : function () {
            
            if (!this.board) this.board = new ShareBoard.Model.Board()
            
            
            var fayeClient = this.fayeClient = new Faye.Client('http://local:8000/faye')
            
            fayeClient.subscribe('/draw', this.onDrawLine.createDelegate(this))
            
            Ext.apply(this, {
                
                title : 'ShareBoard draw area',
                
                height : 800,
                
                tbar : [
                    {
                        text        : 'Clear',
                        handler     : this.onClear,
                        scope       : this
                    },
                    '-',
                    {
                        text : 'Line'
                    },
                    {
                        xtype   : 'checkbox',
                        boxLabel: 'Smooth'
                    },
                    '-',
                    {
                        text : 'Ellipse'
                    }
                ]
            })
        }
    },
    
    
    after : {
        
        onRender : function (ct, position) {
            var body = this.body
            
            var paper = this.paper = Raphael(body.dom, '100%', '100%')
            
            this.mon(body, 'mousedown', this.onMouseDown, this)
            this.mon(body, 'mousemove', this.onMouseMove, this)
            this.mon(body, 'mouseup', this.onMouseUp, this)
            
            this.mon(body, 'mouseover', this.onMouseOver, this)
            this.mon(body, 'mouseout', this.onMouseOut, this)
        }
    },
            
            
    methods : {
        
        onClear : function () {
            this.paper.clear()
        },
        
        
        getLayerX : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetX || extjsEvent.browserEvent.layerX
        },
        
        
        getLayerY : function (extjsEvent) {
            return extjsEvent.browserEvent.offsetY || extjsEvent.browserEvent.layerY
        },
        
        
        onMouseDown : function (e) {
            this.isPressed  = true
            
            var layerX = this.downX      = this.getLayerX(e)
            var layerY = this.downY      = this.getLayerY(e)
            
            var element = new ShareBoard.Widget.Board.Element.Path({
                
                layerX      : layerX,
                layerY      : layerY,
                
                board       : this.board
            })
        },
        
        
        onMouseUp : function (e) {
            this.isPressed  = false
            
            delete this.currX
            delete this.currY
        },
        
        
        // XXX need to accumulate distance & path
        onMouseMove : function (e) {
            var prevX = this.currX || this.downX
            var prevY = this.currY || this.downY
            
            this.currX      = this.getLayerX(e)
            this.currY      = this.getLayerY(e)
            
            if (this.isPressed /*&& this.getDistance(prevX, prevY, this.currX, this.currY) > this.threshold*/) {
                this.drawLine(prevX, prevY, this.currX, this.currY)
                
                this.fayeClient.publish('/draw', {
                    source  : this.guid,
                    
                    fromX   : prevX,
                    fromY   : prevY,
                    toX     : this.currX,
                    toY     : this.currY
                })
            }
        },
        
        
        // XXX use fast approximating algorithm (check javascript clothes simulation)
        getDistance : function (fromX, fromY, toX, toY) {
            return Math.sqrt((toX - fromX) * (toX - fromX) + (toY - fromY) * (toY - fromY))
        },
        
        
        drawLine : function (fromX, fromY, toX, toY) {
            var path = this.paper.path("M " + fromX + ' ' + fromY + ' L ' + toX + ' ' + toY)
            
            path.attr({
                fill    : 'green',
                stroke  : 'green',
                color   : 'green'
            })
        },
        
        
        onDrawLine : function (message) {
            // skip own events
            if (message.source == this.guid) return
            
            this.drawLine(message.fromX, message.fromY, message.toX, message.toY)
        },
        
        
        onMouseOver : function () {
        },
        
        
        onMouseOut : function () {
//            if ()
        }
    }
    
})




//    function getAnchors(p1x, p1y, p2x, p2y, p3x, p3y) {
//        var l1 = (p2x - p1x) / 2,
//            l2 = (p3x - p2x) / 2,
//            a = Math.atan((p2x - p1x) / Math.abs(p2y - p1y)),
//            b = Math.atan((p3x - p2x) / Math.abs(p2y - p3y));
//        a = p1y < p2y ? Math.PI - a : a;
//        b = p3y < p2y ? Math.PI - b : b;
//        var alpha = Math.PI / 2 - ((a + b) % (Math.PI * 2)) / 2,
//            dx1 = l1 * Math.sin(alpha + a),
//            dy1 = l1 * Math.cos(alpha + a),
//            dx2 = l2 * Math.sin(alpha + b),
//            dy2 = l2 * Math.cos(alpha + b);
//        return {
//            x1: p2x - dx1,
//            y1: p2y + dy1,
//            x2: p2x + dx2,
//            y2: p2y + dy2
//        };
//    }
//    