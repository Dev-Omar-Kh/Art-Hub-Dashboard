import React from 'react'
import LoadingRow from '../loading-row/LoadingRow'

export default function WorkCardLoading() {

    return <React.Fragment>

        <div className='p-2.5 grid grid-cols-3 items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]'>

            <LoadingRow className='w-full rounded-md h-28' />

            <div className='col-span-2 flex flex-col gap-5'>

                <LoadingRow className='w-3/4 h-8 rounded-4xl' />

                <div className='flex items-center justify-between'>

                    <LoadingRow className='w-18 h-6 rounded-4xl' />

                    <LoadingRow className='w-20 h-8 rounded-4xl' />

                </div>

            </div>

        </div>

    </React.Fragment>

}
