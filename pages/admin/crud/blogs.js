import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import BlogCreate from '../../../components/crud/BlogCreate'
import Link from 'next/link'
import BlogRead from '../../../components/blog/BlogRead'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config'

const Blog = () => {
    const head = () => (
        <Head>
            <title>Manage blogs | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <Admin>
                    <div className='container'>
                        
                        <div className='row'>
                            <div className='col-md-12 pt-5 pb-5'>
                                <h2>Manage blogs</h2>
                            </div>
                            <div className='col-md-12'>
                                <BlogRead />
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        </>
    )
}

export default Blog