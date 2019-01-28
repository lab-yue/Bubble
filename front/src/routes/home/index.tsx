import { h } from 'preact';
const style = require('./style.scss');
import QuestionBox from '../../components/questionbox'
import * as Type from '../../types'

export default (props: Type.HomeProps) => (
	<div className={style.home}>
		<h1 className={style.h1}>Search</h1>
		<QuestionBox />
	</div>
);

