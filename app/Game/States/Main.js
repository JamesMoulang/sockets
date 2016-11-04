import 'pixi';
import 'p2';
import "phaser";

import io from 'socket.io-client/socket.io'

import Maths from '../Helpers/Maths';
import Vector from '../Helpers/Vector';
import _ from 'underscore';

import Player from '../Entities/Player';
import OtherPlayer from '../Entities/OtherPlayer';

class Main extends Phaser.State {
	create() {
		this.groundGroup = this.add.group();
		this.gameGroup = this.add.group();
		
		this.socket = io();

		this.id = null;
		this.players = [];

		this.socket.on('login', (data) => {
			console.log("logging in with id " + data.id);
			this.id = data.id;
			this.players = data.players;

			_.each(this.players, (p) => {
				this.createPlayer(p.id, p.x, p.y);
			})

			this.player = new Player(this, this.id, this.socket, 120, 100);
			this.gameGroup.add(this.player.childSprite);
		})

		this.socket.on('create player', this.createPlayer.bind(this));
		this.socket.on('remove player', this.removePlayer.bind(this));

		this.socket.on('move player', this.movePlayer.bind(this));
	}

	movePlayer(data) {
		var player = _.find(this.players, (p) => {
			return p.socket_id == data.id;
		});
		if (player != null) {
			player.moveTo(new Vector(data.x, data.y));
		}
	}

	createPlayer(id, x=120, y=100) {
		console.log("creating a player with id " + id);
		var other = new OtherPlayer(this, this.socket, id, x, y);
		this.gameGroup.add(other.childSprite);
		this.players.push(other);
	}

	removePlayer(id) {
		console.log("removing a player with id " + id);
		var player = _.find(this.players, (p) => {
			return p.socket_id == id;
		});
		console.log(player);
		if (player != null) {
			console.log("destroying!");
			this.players = _.without(player);
			this.gameGroup.remove(player.childSprite, true);
			player.destroy();
		}
	}

	update() {
		this.gameGroup.sort('depth', Phaser.Group.SORT_ASCENDING);
	}
}

export default Main;
