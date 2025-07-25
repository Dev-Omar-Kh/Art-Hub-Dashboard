import React from 'react';
import StatisticsCard from '../../../components/statistics-card/StatisticsCard';
import StatisticsLoading from '../../../components/statistics-card/StatisticsLoading';
import FetchError from '../../../components/error/FetchError';

export default function Statistics({statisticsData, isLoading, isError}) {

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full grid grid-cols-3 gap-5 max-[720px]:grid-cols-1'>

            {isLoading && Array.from({length: 3}).map((_, idx) => <StatisticsLoading key={idx} />)}

            {!isLoading && !isError && statisticsData && 
                statisticsData.map(state => (<StatisticsCard key={state.id} data={state} />))
            }

        </div>

    </React.Fragment>

}
