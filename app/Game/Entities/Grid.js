import Maths from '../Helpers/Maths';
import _ from 'underscore';

import Cell from './Cell';

class Grid {
	constructor(width, height, columns, rows) {
		this.width = width;
		this.height = height;
		this.columns = columns;
		this.rows = rows;

		this.columnWidth = width / columns;
		this.rowHeight = height / rows;

		this.entities = [];
		this.cells = [];
		for (var x = 0; x < this.columns; x++) {
			this.cells.push([]);
			for (var y = 0; y < this.rows; y++) {
				this.cells[x].push(new Cell(x, y, this.columnWidth, this.rowHeight));
			}
		}
	}

	getCellFromWorldPosition(pos) {
		var x = Maths.clamp(Math.floor(pos.x / this.columnWidth), 0, this.cells.length - 1);
		var y = Maths.clamp(Math.floor(pos.y / this.rowHeight), 0, this.cells[0].length - 1);	
		return this.cells[x][y];
	}

	removeEntityFromGrid(entity) {
		if (entity.currentCell != null) {
			entity.currentCell.entities = _.without(
				entity.currentCell.entities, 
				entity
			);
		}
	}

	forAllEntities(entity, radius, tag='any', callback) {
		var start_x = Math.floor(Maths.clamp(entity.currentCell.x - radius, 0, this.cells.length-1));
		var start_y = Math.floor(Maths.clamp(entity.currentCell.y - radius, 0, this.cells[0].length-1));

		var end_x = Math.floor(Maths.clamp(entity.currentCell.x + radius, 0, this.cells.length-1));
		var end_y = Math.floor(Maths.clamp(entity.currentCell.y + radius, 0, this.cells[0].length-1));

		for (var x = start_x; x <= end_x; x++) {
			for (var y = start_y; y <= end_y; y++) {
				var cell = this.cells[x][y];
				for (var i = 0; i < cell.entities.length; i++) {
					if (tag == 'any' || tag == cell.entities[i].tag) {
						callback(cell.entities[i]);
					}
				}
			}
		}
	}

	addEntity(entity) {
		this.entities.push(entity);
		var cell = this.getCellFromWorldPosition(entity.pos);
		cell.entities.push(entity);
		entity.currentCell = cell;
	}
}

export default Grid;
