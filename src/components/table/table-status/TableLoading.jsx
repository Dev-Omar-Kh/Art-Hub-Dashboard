import React from 'react';
import LoadingCircle from '../../loading-circle/LoadingCircle';

export default function TableLoading() {

    return <React.Fragment>

        <tr className='
            border-t border-solid border-[var(--mid-gray-color)]
            text-base font-normal text-[var(--gray-color)] text-center
        '>
            <td colSpan="100%" className='py-5'>
                <div className='w-full h-40 flex items-center justify-center'>
                    <LoadingCircle />
                </div>
            </td>
        </tr>

    </React.Fragment>

}
