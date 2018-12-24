import { h, Component } from 'preact';
import { route } from 'preact-router';
const style = require('./style.scss');
import * as Type from '../../types'

export default class QuestionBox extends Component {

    state: Type.Question= {
        searchText: "",
        offset: 0
    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
    }

    handleInput = (e: any) => {
        const q: String = e.target.value
        this.setState({
            searchText: q
        })
        this.goSearch()
    }

    goSearch = () => {
        console.log(this.state.searchText)
        if (this.state.searchText === "") {
            return
        }

        route(`/search?q=${this.state.searchText}&offset=${this.state.offset}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleInput} className={style.input} type="text" />
            </form>
        )
    }
}