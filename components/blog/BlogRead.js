import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { list, removeBlog, removeManyBlog } from '../../actions/blog'
import moment from 'moment'

const BlogRead = ({username}) => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('')
    const token = getCookie('token')
    const [checked, setChecked] = useState([])

    useEffect(() => {
        loadBlogs()
    }, [])

    const loadBlogs = () => {
        list(username).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setBlogs(data)
            }
        })
    }

    const deleteBlog = (slug) => {
        removeBlog(slug, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setMessage(data.message)
                loadBlogs()
            }
        })
    }

    const deleteBlogs = (checked) => {
        const slug = checked.toString()
        console.log(typeof slug)
        removeManyBlog(slug, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setMessage(data.message)
                loadBlogs()
            }
        })
    }

    const deleteConfirm = (slug) => {
        let answer = window.confirm('Are you sure you want to delete your blog?')
        if(answer) {
            deleteBlog(slug)
        }
    }

    const showUpdateButton = (blog) => {
        if(isAuth && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${blog.slug}`}>
                    <a className='btn btn-sm btn-warning ml-2'>Update</a>
                </Link>
            )
        } else if(isAuth && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${blog.slug}`}>
                    <a className='ml-2 btn btn-sm btn-warning ml-2'>Update</a>
                </Link>
            )
        }
    }

    const handleToggle = blog => () => {
        // setValues({...values, error: ''})
        // retrun the frist index or -1
        const clickedSlug = checked.indexOf(blog)
        const all = [...checked]
        if(clickedSlug === -1) {
            all.push(blog)
        } else {
            all.splice(clickedSlug, 1)
        }
        console.log(all)
        console.log(clickedSlug)
        setChecked(all)
        // formData.set('slugs', all)
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className='pb-5'>
                    <label className='form-check-label pointer'>
                        <input onChange={handleToggle(blog.slug)} type="checkbox" value={`${blog.slug}`} />
                        <span className='pl-3'>{blog.title}</span>
                    </label>
                    
                    <p className='mark'>Written by {blog.postedBy.name} | Published on {moment(blog.updatedAt).fromNow()}</p>
                    <button className='btn btn-sm btn-danger' onClick={() => deleteConfirm(blog.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(blog)}
                    
                    
                </div>
            )
        })
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>
                    {message && <div className='alert alert-warning'>{message}</div>}
                    {showAllBlogs()}
                </div>
                <button className='btn btn-sm btn-danger' onClick={() => deleteBlogs(checked)}>Select Delete</button>
            </div>
        </>
    )
}

export default BlogRead