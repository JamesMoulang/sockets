import 'pixi';
import 'p2';
import "phaser";

class Preload extends Phaser.State {
	preload() {
		this.load.image('man_hitbox', '/man_hitbox.png');

		this.load.image('man_left', '/man_left.png');
		this.load.image('man_walk_1_left', '/man_walk_1_left.png');
		this.load.image('man_walk_2_left', '/man_walk_2_left.png');

		this.load.image('man_right', '/man_right.png');
		this.load.image('man_walk_1_right', '/man_walk_1_right.png');
		this.load.image('man_walk_2_right', '/man_walk_2_right.png');

		this.load.image('leaf_1', '/leaf_1.png');
		this.load.image('leaf_2', '/leaf_2.png');
		this.load.image('leaf_3', '/leaf_3.png');
		this.load.image('leaf_4', '/leaf_4.png');
		this.load.image('leaf_5', '/leaf_5.png');
	}

	create() {
		this.state.start('main');
	}
}

export default Preload;
