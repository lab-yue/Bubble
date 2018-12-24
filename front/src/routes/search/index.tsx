import { h, Component } from 'preact';
import { route } from 'preact-router';
import Navigator from '../../components/nav'
import * as Type from '../../types'

const style = require('./style.scss');

const Result = (props: Type.ResultProps) => (
    <li className={style.result}>
        <a href={props.data.url} target="_blank" rel="noopener noreferrer" >
            <h3 className={style.title}>{props.data.title}</h3>
            <cite>{props.data.url}</cite>
        </a>
    </li>
)

export default class Search extends Component<Type.HomeProps>{

    state: Type.SearchState = {
        searchText: "",
        searchResultList: [],
        offset: 0
    }

    componentWillMount() {

        const params = new URLSearchParams(window.location.search)

        const q = params.get('q')
        const offset = parseInt(params.get('offset'))

        if (!isNaN(offset) ) {
            q
                ? this.search(q, offset)
                : route('/')
        } else {
            route('/')
        }

    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
    }

    handleInput = (e: any) => {
        const q: string = e.target.value
        this.search(q)
    }

    search = (q: string, offset: number = 0) => {

        if (q === "") {
            return
        }

        this.setState({
            searchText: q
        })

        fetch(`${process.env.PREACT_APP_API}?q=${q}&offset=${offset}`, {
            mode: 'cors'
        })
            .then(res => res.json())
            .then(result => {
                this.setState({
                    searchResultList: result,
                    offset: offset
                })
                console.log(result)
            })
    }

    changeOffset = (action: Type.NavigatorAction) => {
        if (action === 'forth') {

            this.search(this.state.searchText, this.state.offset += 10)
        } else {

            if (this.state.offset === 0){
                return
            }
            this.search(this.state.searchText, this.state.offset -= 10)
        }
    }

    render(props: any, state: Type.SearchState) {
        return (
            <div>
                <form className={style.form} onSubmit={this.handleSubmit}>
                    Search: <input onChange={this.handleInput} className={style.input} type="text" />
                </form>
                <Navigator changeOffset={this.changeOffset} />
                <ul>
                    {
                        state.searchResultList.map((result, id) => <Result key={id} data={result} />)
                    }
                </ul>
                <Navigator changeOffset={this.changeOffset} />
            </div>
        )
    }
}