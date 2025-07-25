import React from 'react'
import AnalysisCard from './AnalysisCard'
import ListBtn from '../../../components/buttons/ListBtn'
import { useTranslation } from 'react-i18next'
import FetchError from '../../../components/error/FetchError';

export default function Analysis({data, filterListData, setPeriod, isLoading, isError}) {

    const {t} = useTranslation();

    if(isError) return <FetchError className='w-full' />

    return <React.Fragment>

        <div 
            className='
                w-full p-5 rounded-2xl bg-[var(--white-color)] 
                flex flex-col gap-5 shadow-[0_0px_10px_var(--shadow-black-color)]
            '
        >

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <h3 className='text-xl font-semibold text-[var(--dark-blue-color)]'>{t('revenueAndOrdersStatistics')}</h3>

                <ListBtn listData={filterListData.data} 
                    filterKey={filterListData.key}
                    onFilterChange={(key, value) => setPeriod(prev => ({ ...prev, [key]: value }))}
                />

            </div>

            <div className='w-full grid grid-cols-2 gap-5 max-[1090px]:grid-cols-1 max-[980px]:grid-cols-2 max-[730px]:grid-cols-1'>
            
                {data.map(item => <AnalysisCard 
                    key={item.id} data={item} 
                    isLoading={isLoading} isError={isError} 
                />)}

            </div>

        </div>

    </React.Fragment>

}
