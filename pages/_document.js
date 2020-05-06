import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

class MyDocument extends Document {
    setGoogleTags() {
        if(publicRuntimeConfig) {
            return {
                __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    
                    gtag('config', 'UA-165676706-1');
                `
            }
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link 
                        rel="stylesheet" 
                        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" 
                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" 
                        crossOrigin="anonymous" 
                    />
                    <link 
                        rel="stylesheet" 
                        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                    />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-165676706-1"></script>
                    <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
                </Head>
                <head>
                    <title>MyBlog</title>
                </head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument