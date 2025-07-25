import React from 'react'
import LoadingRow from '../../components/loading-row/LoadingRow'

export default function AdminProfileLoading() {

    return <React.Fragment>

        <div 
            className='
                w-full p-5 flex items-center gap-5 rounded-2xl bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--shadow-black-color)] max-[695px]:flex-col max-[770px]:items-start
            '
        >

            <div className='w-52 h-52 min-w-52 min-h-52 overflow-hidden max-[430px]:w-36 max-[430px]:h-36 max-[430px]:m-auto'>
                <LoadingRow className='w-full h-full rounded-full' />
            </div>

            <div className='w-full flex flex-col gap-5'>

                <LoadingRow className='w-2/3 h-8 rounded-4xl' />

                <LoadingRow className='w-1/3 h-8 rounded-4xl' />

                <LoadingRow className='w-1/4 h-8 rounded-4xl' />

                <div className='flex items-center gap-2.5'>

                    <LoadingRow className='w-24 h-8 rounded-4xl' />
                    <LoadingRow className='w-24 h-8 rounded-4xl' />

                </div>

            </div>

            </div>

    </React.Fragment>

}
