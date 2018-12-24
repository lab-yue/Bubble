import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Layout from './layout';

import Home from '../routes/home';
import Search from '../routes/search';
import * as Type from '../types'


export default class App extends Component {

	currentUrl: string = window.location.href

	handleRoute = (e: Type.RouterEvent) => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Layout>
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Search path="/search" />
					</Router>
				</Layout>

			</div>
		);
	}
}
