var http    = require('http')
var faye    = require('faye')
var sys     = require('sys')
var puts    = sys.puts


puts('ShareBoard.Server started')


var bayeux = new faye.NodeAdapter({
    mount:    '/faye',
    timeout:  45
})


// Handle non-Bayeux requests
var server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write('Hello, non-Bayeux request')
    response.end()
})


bayeux.attach(server)
server.listen(8000)