import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import Man from './Man';

class NPC extends Man {
	constructor(game, grid, x, y) {
		super(game, grid, x, y);
		this.goIdle();
		this.direction = new Vector(0, 0);
	}

	update() {
		this._state();
		super.update();
	}

	goIdle() {
		this.goIdleTime = this.game.time.time;
		this.idleWaitTime = 1500 + Math.random() * 2000;
		this.lookAroundCount = 0;
		this.lookAroundWait = 250 + Math.random() * 750;
		this._state = this.idle.bind(this);
	}

	idle() {
		this.childSprite.loadTexture('man' + (this.facing.x == 1 ? '_right' : '_left'));
		this.idealWidth = (this.game.cache.getImage(this.childSprite.key).width);
		this.lookAroundCount += this.game.time.physicsElapsedMS;
		if (this.lookAroundCount > this.lookAroundWait) {
			this.facing.x *= -1;
			this.lookAroundCount = 0;
			this.lookAroundWait = 250 + Math.random() * 750;
			this.updateFacing();
		}

		if (this.game.time.time - this.goIdleTime > this.idleWaitTime) {
			this.startWalking();
		}
	}

	startWalking() {
		this.startWalkingTime = this.game.time.time;
		this.walkWaitTime = 1500 + Math.random() * 2000;
		this._state = this.walk.bind(this);
		this.direction = new Vector(
			Math.round((Math.random() - 0.5) * 2),
			Math.round((Math.random() - 0.5) * 2)
		);
	}

	walk() {
		this.moveMan(this.direction);
		if (this.game.time.time - this.startWalkingTime > this.walkWaitTime) {
			this.goIdle();
		}

		this.wrap();
	}
}

export default NPC;
