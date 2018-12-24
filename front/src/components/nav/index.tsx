import { h, Component } from 'preact';
const style = require('./style.scss');
import * as Type from '../../types'


export default class Navigator extends Component<Type.NavigatorProps>{

    constructor(props: Type.NavigatorProps) {
        super(props)
    }

    back = () => {
        this.props.changeOffset('back')
    }

    forth = () => {
        this.props.changeOffset('forth')
    }

    render() {
        return (
            <nav className={style.nav}>
                <div>
                    <button onClick={this.back} className={style.button}>{"<"}</button>
                </div>

                <div>
                    <button onClick={this.forth} className={style.button} >{">"}</button>
                </div>
            </nav>
        )

    }
}