import { h, Component } from 'preact';
import { route } from 'preact-router';
import Navigator from '../../components/nav';
import * as Type from '../../types';

const style = require('./style.scss');

const Result = (props: Type.ResultProps) => (
    <li className={style.resultBlock}>
        <div className={style.result}>
            <a href={props.data.url} target="_blank" rel="noopener noreferrer" >
                <h3 className={style.title}>{props.data.title}</h3>
                <cite>{props.data.url}</cite>
            </a>
        </div>
    </li>
)

export default class Search extends Component<Type.HomeProps>{

    placeholder = [...Array(10)].fill({
        title: 'searching...',
        url: ' (｡･ω･｡) (｡･ω･｡) (｡･ω･｡) '
    })

    state: Type.SearchState = {
        searchText: "",
        searchResultList: this.placeholder,
        offset: 0
    }

    async componentWillMount() {

        const params = new URLSearchParams(window.location.search)
        const q = params.get('q')
        const offset = parseInt(params.get('offset'))

        if (!isNaN(offset)) {
            q
                ? await this.search(q, offset)
                : route('/')
        } else {
            route('/')
        }

    }

    handleSubmit = (e: Event) => {
        e.preventDefault()
    }

    handleInput = async (e: any) => {
        const q: string = e.target.value
        await this.search(q)
    }

    search = async (q: string, offset: number = 0) => {

        if (!q) {
            return
        }
        this.setState({
            searchText: q,
            searchResultList: this.placeholder,
            offset: offset
        })

        window.scrollTo({ top: 0, behavior: 'smooth' })

        const res = await fetch(`${process.env.PREACT_APP_API}?q=${q}&offset=${offset}`, {
            mode: 'cors'
        })

        this.setState({
            searchText: q,
            searchResultList: await res.json(),
            offset: offset
        })
    }

    changeOffset = async (action: Type.NavigatorAction) => {
        if (action === 'forth') {

            await this.search(this.state.searchText, this.state.offset += 10)
        } else {

            if (this.state.offset === 0) {
                return
            }
            await this.search(this.state.searchText, this.state.offset -= 10)
        }
    }

    render(props: any, state: Type.SearchState) {
        return (
            <div>
                <h1 className={style.h1}>Search</h1>
                <form className={style.form} onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleInput}
                        className={style.input}
                        type="text"
                    />
                </form>
                <Navigator changeOffset={this.changeOffset} />
                <ul rel="results">
                    {
                        state.searchResultList.map((result, id) => <Result key={id} data={result} />)
                    }
                </ul>
                <Navigator changeOffset={this.changeOffset} />
            </div>
        )
    }
}