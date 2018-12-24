import { h } from 'preact';
import { Link } from 'preact-router/match'
const style = require('./style.scss');

const Header = () => (
	<header class={style.header}>
		<Link activeClassName="" href="/"><h1>Bubble</h1></Link>
		<nav>
			<a href="https://github.com/necroplankton" target="_blank" rel="noopener noreferrer" >Gihub</a>
		</nav>
	</header>
);

export default Header;
