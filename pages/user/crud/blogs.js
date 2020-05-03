import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import Link from 'next/link'
import BlogRead from '../../../components/blog/BlogRead'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config'
import { isAuth } from '../../../actions/auth'

const Blog = () => {
    const username = isAuth() && isAuth().username
    const head = () => (
        <Head>
            <title>Manage blogs | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <Private>
                    <div className='container'>
                        
                        <div className='row'>
                            <div className='col-md-12 pt-5 pb-5'>
                                <h2>Manage blogs</h2>
                            </div>
                            <div className='col-md-12'>
                                <BlogRead username={username} />
                            </div>
                        </div>
                    </div>
                </Private>
            </Layout>
        </>
    )
}

export default Blog