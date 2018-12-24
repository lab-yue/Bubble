import { h } from 'preact';
const style = require('./style.scss');
import QuestionBox from '../../components/questionbox'
import * as Type from '../../types'

const Home = (props: Type.HomeProps) => (
	<div class={style.home}>
		<h1>Search</h1>
		<QuestionBox />
	</div>
);

export default Home;
