Class('ShareBoard.View.Board.Element', {
    
    does    : [
        'JooseX.Observable',
        'ShareBoard.Role.LocalEvent'
    ],
    
    
    has : {
        boardWidget     : { required : true },
        
        model           : { required : true },
        
        uuid            : null,
        
        isSelected      : false,
        
        raphael         : null,
        node            : null,
        
        clicker         : null,
        clickerNode     : null
    },
    
    
    methods : {
        
        initialize : function () {
            this.uuid       = this.model.uuid
            
            this.model.on('/mutation/apply/attribute', this.onAttributeMutate, this)
        },
        
        
        getBoard : function () {
            return this.boardWidget.board
        },
        
        
        getPaper : function () {
            return this.boardWidget.paper
        },
        
        
        render : function () {
            throw "Abstract method called"
        },
        
        
        onAttributeMutate : function (event, mutation) {
            throw "Abstract method called"
        },
        
        
        getStyle : function (attr) {
            var viewProp = (this.model.status == 'draft' ? 'phantom' : 'current') + Joose.S.uppercaseFirst(attr)
            
            return this.getBoard().view[ viewProp ]
        },
        
        
        updateStyle : function () {
            this.raphael.attr({
                opacity             : this.getStyle('opacity'),
                stroke              : this.getStyle('color'),
                'stroke-dasharray'  : this.getStyle('dashing'),
                'stroke-width'      : this.getStyle('width')
            })
        },
        
        
        select : function () {
        },
        
        
        deselect : function () {
        }
    }
})

