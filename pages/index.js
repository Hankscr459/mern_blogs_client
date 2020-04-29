import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'

const Index = () => {
    const head = () => (
        <Head>
            <title>HOME | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <h2>Index page</h2>
                <Link href='/signup'>
                    <a>Signup</a>
                </Link>
            </Layout>
        </>
    )
}

export default Index