import React from 'react'
import LoadingRow from '../loading-row/LoadingRow'

const rows = ['w-2/3 h-5 rounded-4xl', 'w-1/3 h-8 rounded-4xl', 'w-3/5 h-3 rounded-4xl'];

export default function StatisticsLoading() {

    return <React.Fragment>

        <div className='p-5 rounded-2xl bg-[var(--white-color)] flex flex-col gap-5 shadow-[0_0px_10px_var(--shadow-black-color)]'>

            {rows.map((rowStyle, idx) => <LoadingRow key={idx} className={rowStyle} />)}

        </div>

    </React.Fragment>

}
