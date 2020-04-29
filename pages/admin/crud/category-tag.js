import Layout from '../../../components/Layout'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import Admin from '../../../components/auth/Admin'
import Head from 'next/head'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../../config'

const CategoryTag = () => {
    const head = () => (
        <Head>
            <title>CategoryTag | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <Admin>
                    <div className='container-fluid'>
                        
                        <div className='row'>
                            <div className='col-md-12 pt-5 pb-5'>
                                <h2>Manage Categories and Tags</h2>
                            </div>
                            <div className='col-md-6'>
                                <ul className='list-group'>
                                    <Category />
                                </ul>
                            </div>
                            <div className='col-md-6'>
                                <Tag />
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        </>
    )
}

export default CategoryTag