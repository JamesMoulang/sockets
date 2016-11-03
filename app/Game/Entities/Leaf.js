import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';
import QuadrantSprite from './QuadrantSprite';

class Leaf extends QuadrantSprite {
	constructor(game, grid, x, y) {
		super(
			game, 
			grid, 
			x, 
			y, 
			'leaf_' + (1 + Math.floor(Math.random() * 5)).toString(),
			'leaf'
		);

		this.velocity = new Vector(0, 0);
	}

	gust(d) {
		
	}


}

export default Leaf;
