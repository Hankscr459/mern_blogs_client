import fetch from 'isomorphic-fetch'
import { API } from '../config'
import queryString from 'query-string'
import { isAuth, handleResponse } from './auth'

export const createBlog = (blog, token) => {
    let createBlogEndpoint
    if (isAuth && isAuth().role === 1 ) {
        createBlogEndpoint = `${API}/blog`
    } else if (isAuth() && isAuth().role === 0 ) {
        createBlogEndpoint = `${API}/user/blog`
    }

    return fetch(`${createBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    }
    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const singleBlog = ( slug = undefined) => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const listRelated = (blog) => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const list = (username) => {
    let listBlogsEndpoint
    if (username) {
        listBlogsEndpoint = `${API}/${username}/blogs`
    } else {
        listBlogsEndpoint = `${API}/blogs`
    }
    return fetch(`${listBlogsEndpoint}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const removeBlog = (slug, token) => {
    let deleteBlogsEndpoint
    if (isAuth() && isAuth().role === 0) {
        deleteBlogsEndpoint = `${API}/user/blog/${slug}`
    } else if (isAuth() && isAuth().role === 1) {
        deleteBlogsEndpoint = `${API}/blog/${slug}`
    }
    return fetch(`${deleteBlogsEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const removeManyBlog = (slug, token) => {
    let deleteBlogsEndpoint
    if (isAuth() && isAuth().role === 0) {
        deleteBlogsEndpoint = `${API}/user/blogs/${slug}`
    } else if (isAuth() && isAuth().role === 1) {
        deleteBlogsEndpoint = `${API}/blogs/${slug}`
    }
    return fetch(`${deleteBlogsEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    })
        .then(response => {
            handleResponse(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const updateBlog = (blog, token, slug) => {
    let updateBlogsEndpoint
    if (isAuth() && isAuth().role === 0) {
        updateBlogsEndpoint = `${API}/user/blog/${slug}`
    } else if (isAuth() && isAuth().role === 1) {
        updateBlogsEndpoint = `${API}/blog/${slug}`
    }
    return fetch(`${updateBlogsEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(response => {
            handleResponse(response)
            return response.json()
        })
        .catch(err => console.log(err))
}

export const listSearch = params => {
    console.log('search params', params)
    let query = queryString.stringify(params)
    console.log('query params', query)
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}