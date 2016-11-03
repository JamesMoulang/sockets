import 'pixi';
import 'p2';
import "phaser";

import Vector from '../Helpers/Vector';

class QuadrantSprite extends Phaser.Sprite {
	constructor(game, grid, x, y, key, tag) {
		super(game, x, y, key);
		this.tag = tag;
		this.pos = new Vector(x, y);
		this.grid = grid;
		this.currentCell = null;

		this.updateCellPosition();
	}

	destroy() {
		this.removeFromCurrentCell();
		super.destroy();
	}

	updateCellPosition() {
		var nextcell = this.grid.getCellFromWorldPosition(this.pos);
		if (this.currentCell != null && nextcell != null && nextcell != this.currentCell) {
			this.removeFromCurrentCell();
		}

		this.grid.addEntity(this);
	}

	removeFromCurrentCell() {
		this.grid.removeEntityFromGrid(this);
	}
}

export default QuadrantSprite;
