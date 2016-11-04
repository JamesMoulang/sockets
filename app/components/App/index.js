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
			game: null,
			gameCanvas: null
		}
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

	sendMessage(msg) {

	}

	componentDidMount() {
		var game = new Game();
		game.sendMessage = this.sendMessage.bind(this);
		this.setState({game});

		document.addEventListener('keydown', function(e) {
			var msg = _.clone(this.state.msg);
			console.log(e.key);
			if ("abcdefghijklmnopqrstuvwxyz .,:;!?#'".indexOf(e.key.toLowerCase()) > -1) {
				msg += e.key;
			} else if (e.key == 'Backspace') {
				e.preventDefault();
				msg = msg.substring(0, msg.length - 1);
			} else if (e.key == 'Enter') {

			}

			this.setState({msg});
		}.bind(this));
	}

	render() {
		return (
			<div>
				{this.state.msg.length ? 
				<div className="textInputBox text-center">
					<h1>{this.state.msg}</h1>
				</div> : null}
				<div ref="content" id="content"></div>
			</div>
		)
	}
}

export default AppComponent;
