import 'pixi';
import 'p2';
import "phaser";

import Maths from '../Helpers/Maths';
import Vector from '../Helpers/Vector';
import _ from 'underscore';

import Player from '../Entities/Player';
import Enemy from '../Entities/Enemy';
import Grid from '../Entities/Grid';
import Leaf from '../Entities/Leaf';

class Main extends Phaser.State {
	create() {
		this.grid = new Grid(this.game.width, this.game.height, 12, 10);
		this.groundGroup = this.add.group();
		this.gameGroup = this.add.group();
		this.player = new Player(
			this.game, 
			this.grid, 
			Math.random() * this.game.width, 
			Math.random() * this.game.height,
			true
		);
		this.gameGroup.add(this.player);
		this.gameGroup.add(this.player.childSprite);

		this.enemies = [];
		// for (var i = 0; i < 25; i++) {
		// 	var enemy = new Enemy(this.game, this.grid, Math.random() * this.game.width, Math.random() * this.game.height);
		// 	this.enemies.push(enemy);
		// 	this.gameGroup.add(enemy);
		// 	this.gameGroup.add(enemy.childSprite);
		// }

		for (var i = 0; i < 500; i++) {
			var leaf = new Leaf(this.game, this.grid, Math.random() * this.game.width, Math.random() * this.game.height);
			this.groundGroup.add(leaf);
		}
	}

	update() {
		this.gameGroup.sort('depth', Phaser.Group.SORT_ASCENDING);
	}
}

export default Main;
