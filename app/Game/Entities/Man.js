import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import QuadrantSprite from './QuadrantSprite';

class Man extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'man_hitbox');
		this.pos = new Vector(x, y);
		game.world.add(this);
		this.anchor.set(0.5, 1);
		this.facing = new Vector(1, 0);
		this.alpha = 0;

		this.childSprite = game.add.sprite(0, 0, 'man_right');
		this.childSprite.anchor.set(0.5, 1);
		this.idealWidth = (this.game.cache.getImage(this.childSprite.key).width);

		this.updateFacing();
		this.walkKey = 1;
		this.animWait = 0.2;
		this.animCounter = 0;
		this.walking = false;
		this.walkSpeed = 20;

		this.updateDisplayPos();
	}

	updateFacing() {
		var key;
		if (this.facing.x >= 0) {
			key = this.childSprite.key.replace('left', 'right');
		} else {
			key = this.childSprite.key.replace('right', 'left');
		}
		this.childSprite.loadTexture(key);
		this.idealWidth = (this.game.cache.getImage(this.childSprite.key).width);
	}

	updateSteps() {
		this.animCounter += this.game.time.physicsElapsed;
		if (this.animCounter > this.animWait) {
			this.walkKey = this.walkKey == 1 ? 2 : 1;
			this.childSprite.loadTexture(
				'man_walk_' + 
				this.walkKey.toString()
				+ (this.facing.x == 1 ? '_right' : '_left')
			);
			this.idealWidth = (this.game.cache.getImage(this.childSprite.key).width);
			this.animCounter -= this.animWait;
		}
	}

	wrap() {
		if (this.pos.x - this.idealWidth * 0.5 > this.game.width) {
			this.pos.x = -this.idealWidth * 0.5;
		}
		if (this.pos.x + this.idealWidth * 0.5 < 0) {
			this.pos.x = this.game.width - this.idealWidth * 0.5;
		}
		if (this.pos.y < 0) {
			this.pos.y = this.game.height + this.height;
		}
		if (this.pos.y - this.height > this.game.height) {
			this.pos.y = 0;
		}
	}

	moveMan(move) {
		if (move.x != 0) {
			this.facing.x = move.x;
		}
		this.updateFacing();

		var nextPos = this.pos.add(
			move
			.normalised()
			.times(
				this.game.time.physicsElapsed * this.walkSpeed
			)
		);

		this.updateWorldPos(nextPos);

		if (move.x != 0 || move.y != 0) {
			if (!this.walking) {
				this.walking = true;
				this.animCounter = this.animWait;
			}
			this.updateSteps();
		} else {
			this.childSprite.loadTexture('man' + (this.facing.x == 1 ? '_right' : '_left'));
		}

		this.updateDisplayPos();
	}

	updateWorldPos(pos) {
		this.pos = pos;
	}

	updateDisplayPos() {
		this.x = Math.round(this.pos.x);
		this.y = Math.round(this.pos.y);
		this.childSprite.x = this.x;
		this.childSprite.y = this.y;

		this.depth = this.pos.y;
		this.childSprite.depth = this.pos.y - 1;
	}
}

export default Man;
