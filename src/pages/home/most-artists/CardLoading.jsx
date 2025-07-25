import React from 'react'
import LoadingRow from '../../../components/loading-row/LoadingRow'

export default function CardLoading() {

    return <React.Fragment>

        <div 
            className='
                relative h-fit p-5 flex flex-col items-center justify-center gap-5 
                bg-[var(--light-gray-color)] rounded-md border border-[var(--sky-blue-color)]
            '
        >

            <LoadingRow className='w-28 h-28 rounded-full' />

            <div className='w-full flex flex-col justify-center items-center gap-2.5'>
                <LoadingRow className='w-3/4 h-6 rounded-4xl' />
                <LoadingRow className='w-3/5 h-6 rounded-4xl' />
            </div>

            <div 
                className='
                    w-full pt-2.5 flex flex-wrap items-center justify-between 
                    border-t-2 border-[var(--sky-blue-color)]
                    max-[675px]:gap-10 max-[675px]:justify-center
                '
            >

                {Array.from({length: 3}).map((_, idx) => <div key={idx} className='flex flex-col items-center justify-center gap-2.5'>
                    <LoadingRow className='w-10 h-5 rounded-4xl' />
                    <LoadingRow className='w-15 h-3 rounded-4xl' />
                </div>)}

            </div>

        </div>

    </React.Fragment>

}
