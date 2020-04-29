import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'

const Signup = () => {
    const head = () => (
        <Head>
            <title>Signup | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <div className='container'>
                    <h2 className='text-center pt-4 pb-4'>Signup page</h2>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <SignupComponent />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Signup