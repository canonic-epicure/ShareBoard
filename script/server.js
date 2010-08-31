require.paths.unshift('./lib')

require('Task/Joose/Core')
require('Task/JooseX/Attribute/Bootstrap')
require('Task/JooseX/Namespace/Depended/NodeJS')
require('Data/UUID')

var http    = require('http')
var faye    = require('faye')
var sys     = require('sys')
var puts    = sys.puts
var express = require('express')


use([

    'ShareBoard.Model.Board',
    'KiokuJS',
    'KiokuJS.Backend.CouchDB'

], function () {
    
    puts('ShareBoard server started')
    
    
    var bayeux = new faye.NodeAdapter({
        mount       : '/faye',
        timeout     : 45
    })
    
    
    var client = bayeux.getClient()
    
    
    var boards = {}
    
    
    
    
    
    client.subscribe('/board/new', function (message) {
    
        
        
        var boardID = 1
        
        client.subscribe('/board/' + boardID, function (message) {
        
        })
        
        client.subscribe('/board/tool', function (message) {
        
        })
        
    })
    
    
    
    client.subscribe('/board/connect', function (message) {
    
        
        
        var boardID = 1
        
        client.subscribe('/board/' + boardID, function (message) {
        
        })
        
        client.subscribe('/board/tool', function (message) {
        
        })
        
    })
    
    
    
    
    var backend = new KiokuJS.Backend.CouchDB({
        host    : 'localhost',
        port    : 80,
        prefix  : '5984',
        
        dbName  : 'shareboard'
    })
    
    var handler = KiokuJS.connect({
        backend : backend
    })
    
    
    var app = express.createServer()
    
    app.configure(function(){
        
        app.use(express.bodyDecoder())
    })
    
    
    app.get('/board/create', function (req, res){
        
        var newBoard = new ShareBoard.Model.Board()
        
        var scope = handler.newScope()
        
        scope.store(newBoard).andThen(function (id) {
            
            puts(id)
        })
        
        res.send(newBoard.uuid + '')
    })
    
    
    app.get('/asd', function(req, res){
        
        res.send('hello asd world')
    })
    
    
    bayeux.attach(app)
    
    app.listen(8080)    
})


