import React from 'react';
import LoadingRow from '../../../components/loading-row/LoadingRow';
import { useTranslation } from 'react-i18next';

export default function UserInfoLoading() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div 
            className='
                w-full p-2.5 flex items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]
                border-l-4 border-[var(--dark-blue-color)]
            '
        >

            <LoadingRow className='w-20 h-20 min-w-20 min-h-20 rounded-full' />

            <div className='w-full flex flex-col gap-1.5'>

                <LoadingRow className='w-1/4 h-6 rounded-4xl' />

                <LoadingRow className='w-1/3 h-4 rounded-4xl' />

                <div className='flex items-center gap-2.5'>
                    <p className='text-base text-[var(--gray-color)]'>{t('statusWord')} :</p>
                    <LoadingRow className='w-16 h-8 rounded-4xl' />
                </div>

            </div>

        </div>

    </React.Fragment>

}
