var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var uid = require('uid');
var _ = require('underscore');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, 'app', 'assets')));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var players = [];

io.on('connection', function(socket){
	var id = uid();
	console.log("user " +id + " connected.");
	socket.emit('login', {id, players});
	socket.broadcast.emit('create player', id);
	players.push({id, x: 120, y: 100});

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	socket.on('disconnect', function(){
		console.log('user disconnected');
		socket.broadcast.emit('remove player', id);
		players = _.filter(players, (p) => {
			return p.id != id;
		});
	});
	socket.on('move', function(data) {
		socket.broadcast.emit('move player', {id: data.id, x: data.x, y: data.y});
	})
});
server.listen(3000, function() {
	console.log("listening on port 3000");
});
