import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { withRouter } from 'next/router'
import { getCookie, isAuth } from '../../actions/auth'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { singleBlog, updateBlog } from '../../actions/blog'
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false})
import '../../node_modules/react-quill/dist/quill.snow.css'
import { QuillModules, QuillFormats } from '../../helpers/quill'
import { API } from '../../config'

const BlogUpdate = ({router}) => {
    const [body, setBody] = useState('')
    const [values, setValues] = useState({
        error: '',
        success: '',
        title: '',
        formData: '',
        title: '',
        body: ''
    })

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checked, setChecked] = useState([])
    const [checkedTag, setCheckedTag] = useState([])

    const {  error, success, formData, title } = values
    const token = getCookie('token')
    

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initBlog()
        initCategories()
        initTags()
    }, [router])

    const initBlog = () => {
        if(router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if(data.error) {
                    console.log(data.error)
                } else {
                    setValues({...values, title: data.title})
                    setBody(data.body)
                    setCategoriesArray(data.categories)
                    setTagsArray(data.tags)
                }
            })
        }
    }

    const setCategoriesArray = blogCategories => {
        let ca = []
        blogCategories.map((c, i) => {
            ca.push(c._id)
        })
        setChecked(ca)
    }

    const setTagsArray= blogTags => {
        let ta = []
        blogTags.map((c, i) => {
            ta.push(c._id)
        })
        setCheckedTag(ta)
    }

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setTags(data)
            }
        })
    }

    const handleToggle = c => () => {
        setValues({...values, error: ''})
        // retrun the frist index or -1
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]
        if(clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        // console.log(all)
        // console.log(clickedCategory)
        setChecked(all)
        formData.set('categories', all)
    }

    const handleTagsToggle = t => () => {
        setValues({...values, error: ''})
        // retrun the frist index or -1
        const clickedTags = checkedTag.indexOf(t)
        const all = [...checkedTag]
        if(clickedTags === -1) {
            all.push(t)
        } else {
            all.splice(clickedTags, 1)
        }
        // console.log(all)
        // console.log(clickedTags)
        setCheckedTag(all)
        formData.set('tags', all)
    }

    const findOutCategories = c => {
        const result = checked.indexOf(c)
        if(result !== -1) {
            return true
        } else {
            return false
        }
    }

    const findOutTags = t => {
        const result = checkedTag.indexOf(t)
        if(result !== -1) {
            return true
        } else {
            return false
        }
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className='list-unstyled'>
                    <label className='form-check-label pointer'>
                        <input 
                            onChange={handleToggle(c._id)} 
                            checked={findOutCategories(c._id)} 
                            type='checkbox' 
                            className='mr-2' 
                        />
                        <span>{c.name}</span>
                    </label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <li key={i} className='list-unstyled'>
                    <label className='form-check-label pointer'>
                        <input 
                            onChange={handleTagsToggle(t._id)} 
                            checked={findOutTags(t._id)} 
                            type='checkbox' 
                            className='mr-2' 
                        />
                        <span>{t.name}</span>
                    </label>
                </li>
            ))
        )
    }

    const handleChange = name => e => {
        // console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''})
    }

    const handleBody = e =>{
        setBody(e)
        formData.set('body', e)
    }

    const editBlog = (e) => {
        e.preventDefault()
        updateBlog(formData, token, router.query.slug).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({ ...values, title: '', success: `Blog titled "${data.title}" is successfully updated` })
                if (isAuth() && isAuth().role === 1) {
                    // Router.replace(`/admin/crud/${router.query.slug}`);
                    Router.replace(`/admin`);
                } else if (isAuth() && isAuth().role === 0) {
                    // Router.replace(`/user/crud/${router.query.slug}`);
                    Router.replace(`/user`);
                }
            }
        })
    }

    const showError = () => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}}>
            {success}
        </div>
    )

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className='form-group'>
                    <label className='text-muted'>Title</label>
                    <input type='text' className='form-control' value={title} onChange={handleChange('title')} />
                </div>
                <div className='form-group'>
                    <ReactQuill 
                        modules={QuillModules} 
                        formats={QuillFormats} 
                        value={body} 
                        placeholder='Write something amazing...' 
                        onChange={handleBody} 
                    />
                </div>
                <div>
                    <button type='submit' className='btn btn-primary' >
                        Update
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-8'>
                    {updateBlogForm()}
                    <div className='pt-3'>
                        {showSuccess()}
                        {showError()}
                    </div>
                    {body && (
                        <img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{ width: '100%' }} />
                    )}
                    
                </div>
                <div className='col-md-4'>
                    <div>
                        <div className='form-group pb-2'>
                            <h5>Featured image</h5>
                            <hr />
                            <small className='text-muted mr-2'>Max size: 1mb</small>
                            <label className='btn btn-outline-info'>
                                Upload feature image
                                <input onChange={handleChange('photo')} type='file' accept='image/*' hidden />
                            </label>
                            
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul className='scrollY'>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul className='scrollY'>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(BlogUpdate)