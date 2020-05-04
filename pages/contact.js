import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'
import ContactForm from '../components/form/ConactForm'

const Index = () => {

    const head = () => (
        <Head>
            <title>Contact Form | {APP_NAME}</title>
        </Head>
    )
    return (
        <>
            {head()}
            <Layout>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2'>
                            <h2>Contact form</h2>
                            <hr />
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Index