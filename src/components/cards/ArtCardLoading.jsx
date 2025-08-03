import React from 'react';
import LoadingRow from '../loading-row/LoadingRow';

const rowsData = ['w-1/3 h-6 rounded-4xl', 'w-1/4 h-4 rounded-4xl', 'w-1/5 h-4 rounded-4xl'];
export default function ArtCardLoading() {


    return <React.Fragment>

        <div 
            className='
                w-full p-2.5 flex items-center justify-between 
                rounded-md bg-[var(--light-gray-color)] 
                max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-5
            '
        >

            <div className='w-full flex flex-col gap-2.5'>
                {rowsData.map((style, idx) => <LoadingRow key={idx} className={style} />)}
            </div>

        </div>

    </React.Fragment>

}
