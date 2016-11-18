"use strict";
var now = require("performance-now")
var NanoTimer = require('nanotimer');

class Server {
	constructor(io, fps=30) {
		io.on('connection', function(socket){
			var id = uid();
			console.log("user " +id + " connected.");
			socket.emit('login', {id: id, players: players});
			socket.broadcast.emit('create player', id);
			players.push({id: id, x: 120, y: 100});

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
		this.lastTimestamp = 0;
		this.delta = 1;
		this.idealFrameTime = 1000 / fps;
		this.fps = fps;
		this.timer = new NanoTimer();
		this.counter = 0;

		this.start();
	}

	timestamp() {
		return now();
	}

	start() {
		this.startTimestamp = this.timestamp();
		this.lastTimestamp = this.timestamp();
		this.loop();
	}

	loop() {
		this.timer.clearInterval();
		var lastFrameTimeElapsed = this.timestamp() - this.lastTimestamp;
		this.delta = lastFrameTimeElapsed / this.idealFrameTime;
		this.update();
		this.lastTimestamp = this.timestamp();
		//This is the time until the next frame.
		var t = (this.idealFrameTime - lastFrameTimeElapsed) / 1000;
		this.timer.setInterval(this.loop.bind(this), '', t+'s');
	}

	update() {
		this.counter++;
		console.log(this.timestamp() - this.startTimestamp);
		if (this.timestamp() > this.startTimestamp + 30000) {
			console.log("30 seconds have passed.");
			console.log(this.counter);
			console.log(bedTime);
		}
	}
}

module.exports = Server;