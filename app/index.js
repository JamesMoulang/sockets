import io from 'socket.io-client/socket.io'

var socket = io();

import 'babel-polyfill';
import React, {Component} from 'react';
import { render } from 'react-dom';
import { App } from './components';

render(
	(
		<div>
			<App/>
		</div>
	),
	document.getElementById('root')
);
