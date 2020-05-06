import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { loginWithFacebook, autheticate, isAuth } from '../../actions/auth'
import { FB_APP_ID } from '../../config'
import FacebookWithLogin from 'react-facebook-login'

const FacebookLogin = () => {
    const responseFacebook = response => {
        // console.log(response)
        const userID = response.userID
        const accessToken = response.accessToken
        const user = { userID, accessToken }
        loginWithFacebook(user).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                autheticate(data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin')
                    } else {
                        Router.push('/user')
                    }
                })
            }
        })
    }
    return (
        <div className='pb-3'>
            <FacebookWithLogin
                appId={`${FB_APP_ID}`}
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
                icon="fa-facebook"
            />
        </div>
    )
}

export default FacebookLogin