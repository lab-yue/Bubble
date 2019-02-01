import { h, Component } from 'preact';
import { route } from 'preact-router';
import Navigator from '../../components/nav';
import * as Type from '../../types';

const style = require('./style.scss');

const Result = (props: Type.ResultProps) => (
    <li className={style.resultBlock}>
        <div className={style.result}>
            <a href={props.data.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <h3 className={`
                    ${style.title}
                    ${props.searching ? style.searching : ''}
                `}>
                    {props.data.title}
                </h3>
                <cite className={props.searching ? style.searching : ''}>
                    {props.data.url}
                </cite>
            </a>
        </div>
    </li>
)

export default class Search extends Component<Type.HomeProps>{

    placeholder = [...Array(10)].fill({
        title: 'searching',
        url: 'searching'
    })

    state: Type.SearchState = {
        searching: false,
        searchText: '',
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

    handleInput = async (e: Event) => {
        this.search((e.target as HTMLInputElement).value)
    }

    scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    search = async (q: string, offset: number = 0) => {

        if (!q) {
            return
        }

        this.setState({
            searching: true,
            searchResultList: this.placeholder
        })

        const fetchAPI = fetch(`${process.env.PREACT_APP_API}?q=${q}&offset=${offset}`, {
            mode: 'cors'
        })
        this.scrollUp()
        let ResultList: Type.SearchResult[]
        try {
            ResultList = await (await fetchAPI).json()
        }
        catch{
            ResultList = [{
                title: 'Error',
                url: 'Fetch api error'
            }]
        }
        this.setState({
            searching: false,
            searchText: q,
            searchResultList: ResultList,
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

    render() {
        return (
            <div>
                <h1 className={style.h1}>Search</h1>
                <form
                    className={style.form}
                    onSubmit={this.handleSubmit}
                >
                    <label for="search">
                        <input
                            id="search"
                            onChange={this.handleInput}
                            className={style.input}
                            type="text"
                        />
                    </label>
                </form>
                <Navigator changeOffset={this.changeOffset} />
                <ul rel="results">
                    {
                        this.state.searchResultList.map(
                            (result, id) =>
                                <Result
                                    searching={this.state.searching}
                                    key={id}
                                    data={result}
                                />
                        )
                    }
                </ul>
                <Navigator changeOffset={this.changeOffset} />
            </div>
        )
    }
}