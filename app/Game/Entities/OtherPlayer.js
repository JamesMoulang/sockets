import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import Man from './Man';

class OtherPlayer extends Man {
	constructor(game, socket, id, x, y) {
		super(game, x, y);
		this.socket_id = id;
		this.socket = socket;
		this.target = new Vector(x, y);
	}

	moveTo(v) {
		this.target = v;
	}

	update() {
		var move = this.target.minus(this.pos);
		if (move.magnitude() > 1) {
			this.moveMan(move);
			this.wrap();
		}
	}
}

export default OtherPlayer;