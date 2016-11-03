import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import Man from './Man';

class Player extends Man {
	constructor(game, grid, x, y, debugCell=false) {
		super(game, grid, x, y);

		this.leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
		this.rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);
		this.upKey = this.game.input.keyboard.addKey(Phaser.KeyCode.UP);
		this.downKey = this.game.input.keyboard.addKey(Phaser.KeyCode.DOWN);

		this.debugCell = debugCell;
		if (this.debugCell) {
			this.square = game.add.sprite(0, 0, 'leaf_1');
			this.square.alpha = 0.25;
		}

		this._state = this.walk.bind(this);
		this.lookAroundCount = 0;
		this.lookAroundWait = 250 + Math.random() * 750;
		// this.tint = 0xff0000;
	}

	update() {
		this._state();

		if (this.debugCell) {
			var cell = this.grid.getCellFromWorldPosition(this.pos);
			this.square.x = cell.x * cell.width;
			this.square.y = cell.y * cell.height;
			this.square.width = cell.width;
			this.square.height = cell.height;
		}
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
