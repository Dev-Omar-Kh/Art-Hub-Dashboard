import React from 'react'

export default function LoadingCircle({
    className = 'w-8 h-8 border-4 border-t-[var(--dark-blue-color)] border-[var(--light-gray-color)]'
}) {

    return <React.Fragment>

        <div className={`${className} rounded-full animate-spin`}/>

    </React.Fragment>

}
