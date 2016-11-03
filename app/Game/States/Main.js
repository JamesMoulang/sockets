import 'pixi';
import 'p2';
import "phaser";

import io from 'socket.io-client/socket.io'

import Maths from '../Helpers/Maths';
import Vector from '../Helpers/Vector';
import _ from 'underscore';

import Player from '../Entities/Player';

class Main extends Phaser.State {
	create() {
		this.groundGroup = this.add.group();
		this.gameGroup = this.add.group();
		
		var player = new Player(this, 24, 24);
		this.game.socket = io();

		this.game.socket.on('login', (data) => {
			this.setState({id: data.id, players: data.players});
		})

		this.game.socket.on('create player', this.createPlayer.bind(this));
		this.game.socket.on('remove player', this.removePlayer.bind(this));
	}

	createPlayer() {
		
	}

	update() {
		this.gameGroup.sort('depth', Phaser.Group.SORT_ASCENDING);
	}
}

export default Main;
