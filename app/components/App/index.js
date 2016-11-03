import React, { Component } from 'react';
import _ from 'underscore';
import Scroll from 'react-scroll';

class AppComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			msg: '',
			messages: []
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		props.io.on('chat message', (msg) => {
			var messages = _.map(this.state.messages, _.clone);
			messages.push(msg);
			this.setState({messages});
		});
	}

	handleChange(event) {
		this.setState({msg: event.target.value});
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.handleSubmit();
		}
	}

	handleSubmit() {
		if (this.state.msg.length > 0) {
			console.log('Text field value is: ' + this.state.msg);
	    	this.props.io.emit('chat message', this.state.msg);
	    	this.setState({msg: ''})
		}
	}

	componentDidUpdate() {
		Scroll.animateScroll.scrollToBottom();
	}

	render() {
		return (
			<div style={{position: 'absolute', width: '100%', height: '100%', overflow: 'scroll'}}>
				<div className="container" style={{overflow: 'scroll', height: '100%'}}>
				  {this.state.messages.map((m) => {
				  	return <p className="lead">{m}</p>;
				  })}
				</div>
				<footer className="footer">
					<div className="container">
						<div className="row">
							<div className="col-sm-12">
								<div className="input-group">
									<input 
										type="text" 
										className="form-control" 
										placeholder="Your message..."
										value={this.state.msg}
          								onChange={this.handleChange}
          								onKeyPress={this.handleKeyPress}
									/>
									<span className="input-group-btn">
										<button onClick={this.handleSubmit} className="btn btn-default" type="button">Send!</button>
									</span>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</div>
		)
	}
}

export default AppComponent;
