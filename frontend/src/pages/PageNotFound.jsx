import React from 'react'
import pageNotFound from "../assets/404_error.png"
const PageNotFound = () => {
    return (
        <div className='flex mt-24 justify-center items-center'>
            <img alt='page-not-found' src={pageNotFound} />
        </div>
    )
}

export default PageNotFound