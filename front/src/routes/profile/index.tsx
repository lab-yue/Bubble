import { h, Component } from 'preact';
const style = require('./style.css');

export default class Profile extends Component {

	render(){
		return(
			<div class={style.home}>
			<h1>Home</h1>
			<p>This is the Profile component.</p>
		</div>
		)
	}
}
