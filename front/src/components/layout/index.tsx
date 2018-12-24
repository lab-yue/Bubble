import { h } from 'preact';
const style = require('./style.scss');

const Layout = (props: any) => {
    return (
        <main className={style.main}>
            {props.children}
        </main>
    )
}

export default Layout
