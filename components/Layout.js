import Header from './Header'
import Footer from './Footer'
import '../static/styles.scss'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout