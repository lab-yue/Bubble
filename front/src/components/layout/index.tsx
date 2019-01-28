import { h } from 'preact';
const style = require('./style.scss');

export default ({children}:any) => {
    return (
        <main className={style.main}>
            {children}
        </main>
    )
}
