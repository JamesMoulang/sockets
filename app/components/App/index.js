import React, { Component } from 'react';
import _ from 'underscore';
import Scroll from 'react-scroll';
import Game from '../../Game';

class AppComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: '',
			messages: [],
			id: null,
			players: [],
			game: null
		}

		props.io.on('login', (data) => {
			this.setState({id: data.id, players: data.players});
		})

		props.io.on('create player', this.createPlayer.bind(this));
		props.io.on('remove player', this.removePlayer.bind(this));
	}

	move(id, x, y) {
		this.props.io.emit(
			'move', 
			{
				x, y,
				id: this.state.id
			}
		);
	}

	removePlayer(id) {
		var players = _.filter(this.state.players, (p) => {
			return p.id != id;
		})
		this.setState({players});
	}

	createPlayer(id) {
		var players = _.map(this.state.players, _.clone);
		players.push({id, x: 0, y: 0});
		this.setState({players});
	}

	componentDidUpdate() {
		Scroll.animateScroll.scrollToBottom();
	}

	componentDidMount() {
		var game = new Game(this.props.io);
		this.setState({game});
	}

	render() {
		return (
			<div>
				<div id="content"></div>
			</div>
		)
	}
}

export default AppComponent;
