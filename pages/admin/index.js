import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Head from 'next/head'
import Link from 'next/link'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'

const AdminIndex = () => {
    const head = () => (
        <Head>
            <title>Admin Dashboard | {APP_NAME}</title>
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
                                <h2>Admin Dashboard</h2>
                            </div>
                            <div className='col-md-4'>
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        <a href='/admin/crud/category-tag'>Create Category</a>
                                    </li>
                                    <li className='list-group-item'>
                                        <a href='/admin/crud/category-tag'>Create Tag</a>
                                    </li>
                                    <li className='list-group-item'>
                                        <a href='/admin/crud/blog'>Create Blog</a>
                                    </li>
                                    <li className='list-group-item'>
                                        <a href='/admin/crud/blogs'>Update/Delete Blog</a>
                                    </li>
                                    <li className='list-group-item'>
                                        <a href='/user/update'>Update Profile</a>
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-8'>
                                right
                            </div>
                        </div>
                    </div>
                </Admin>
            </Layout>
        </>
    )
}

export default AdminIndex