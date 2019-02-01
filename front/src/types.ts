export interface SearchResult {
    title: string,
    url: string
}

export interface HomeProps {
    path: string
}

export interface ResultProps {
    searching: boolean
    data: SearchResult
    key: number
}

export interface RouterEvent {
    url: string
}

export type SearchText = string

export interface Question {
    searchText: SearchText
    offset: Number
}


export interface SearchState {
    searching: boolean
    offset: number
    searchText: SearchText
    searchResultList: Array<SearchResult>
}


export type NavigatorAction = "back" | "forth"

export interface NavigatorProps {
    changeOffset(action: NavigatorAction): void
}
