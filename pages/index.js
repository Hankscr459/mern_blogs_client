import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../config'

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <p className="lead">
                                Best programming and web development blogs and tutorials on React Node NextJs and
                                JavaScript
                            </p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            '/static/images/catone.jpg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">CatOne</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/catone">
                                        <a>
                                            <h3 className="h1">CatOne</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">The world's most popular frontend web development library</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="flip flip-horizontal">
                                <div
                                    className="front"
                                    style={{
                                        backgroundImage:
                                            'url(' +
                                            '/static/images/seoblog.jpg' +
                                            ')'
                                    }}
                                >
                                    <h2 className="text-shadow text-center h1">CatTwo</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/cattwo">
                                        <a>
                                            <h3 className="h1">CatTwo</h3>
                                        </a>
                                    </Link>
                                    <p className="lead">
                                        The worlds most popular backend development tool for JavaScript Ninjas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};


export default Index