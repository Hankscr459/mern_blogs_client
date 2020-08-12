import Layout from '../../../components/Layout'
import Private from '../../../components/auth/Private'
import BlogCreate from '../../../components/crud/BlogCreate'
import Link from 'next/link'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config'

const CreateBlog = () => {
    const head = () => (
        <Head>
            <title>Create blog | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <Private>
                    <div className='container-fluid'>
                        
                        <div className='row'>
                            <div className='col-md-12 pt-5 pb-5'>
                                <h2>Create Blog</h2>
                            </div>
                            <div className='col-md-12'>
                                <BlogCreate />
                            </div>
                        </div>
                    </div>
                </Private>
            </Layout>
        </>
    )
}

export default CreateBlog