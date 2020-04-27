import Header from './Header'
import '../static/styles.scss'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default Layout