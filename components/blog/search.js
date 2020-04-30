import Link from 'next/link'
import Router from 'next/router'
import renderHTML from 'react-render-html'
import { useState, useEffect } from 'react'
import { listSearch } from '../../actions/blog'

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        searched: false,
        message: ''
    })
    const {search, results, searched, message} = values

    const searchSubmit = e => {
        e.preventDefault();
        // listSearch({ search }).then(data => {
        //     setValues({ ...values, results: data, searched: true, message: `${data.length} blogs found` });
        // });
        Router.push({
            pathname: '/search',
            query: { searchQuery: search }
        });
    }

    const handleChange = e => {
        // console.log(e.target.value)
        setValues({...values, search: e.target.value, searched: false})
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className='row'>
                <div className='col-md-8'>
                    <input 
                        type='search' 
                        className='form-control' 
                        placeholder='Search blogs' 
                        onChange={handleChange} 
                    />
                </div>
                <div className='col-md-4'>
                    <button className='btn btn-block btn-outline-primary' type='submit'>
                        Search
                    </button>
                </div>
            </div>
        </form>
    )

    return (
        <div className='container-fluid'>
            <div className='pt-3 pb-5'>{searchForm()}</div>
        </div>
    )
}

export default Search