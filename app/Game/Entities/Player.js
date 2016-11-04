import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import Man from './Man';

class Player extends Man {
	constructor(game, id, socket, x, y) {
		super(game, x, y);
		this.socket_id = id;
		this.socket = socket;
		this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
		this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
		this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
		this.downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

		this._state = this.walk.bind(this);
		this.lookAroundCount = 0;
		this.lookAroundWait = 250 + Math.random() * 750;
		this.childSprite.tint = 0xff0000;
	}

	update() {
		this._state();
		this.socket.emit('move', {id: this.socket_id, x: this.pos.x, y: this.pos.y});
	}

	walk() {
		var move = new Vector(0, 0);
		if (this.leftKey.isDown) {
			move.x--;
		}
		if (this.rightKey.isDown) {
			move.x++;
		}
		if (this.upKey.isDown) {
			move.y--;
		}
		if (this.downKey.isDown) {
			move.y++;
		}

		if (move.x == 0 && move.y == 0) {
			this.lookAroundCount += this.game.time.physicsElapsedMS;
			if (this.lookAroundCount > this.lookAroundWait) {
				this.facing.x *= -1;
				this.lookAroundCount = 0;
				this.lookAroundWait = 250 + Math.random() * 750;
				this.updateFacing();
			}
		} else {
			this.lookAroundCount = 0;
		}

		this.moveMan(move);
		this.wrap();
	}
}

export default Player;
