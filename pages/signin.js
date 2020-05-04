import Layout from '../components/Layout'
import { withRouter } from 'next/router'
import SigninComponent from '../components/auth/SigninComponent'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'

const Signin = ({router}) => {
    const head = () => (
        <Head>
            <title>Signin | {APP_NAME}</title>
        </Head>
    )

    const showRedirectMessage = () => {
        if(router.query.message) {
            return <div className='alert alert-danger'>{router.query.message}</div>
        } else {
            return;
        }
    }

    return (
        <>
            {head()}
            <Layout>
                <div className='container'>
                    <h2 className='text-center pt-4 pb-4'>Signin page</h2>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>{showRedirectMessage()}</div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <SigninComponent />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default withRouter(Signin)