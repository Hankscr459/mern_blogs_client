import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'
import Link from 'next/link'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className='container'>
                    <h2 className='text-center pt-4 pb-4'>Admin Dashboard</h2>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex