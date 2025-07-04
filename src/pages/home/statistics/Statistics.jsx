import React from 'react';
import StatisticsCard from '../../../components/statistics-card/StatisticsCard';

export default function Statistics({statisticsData}) {


    return <React.Fragment>

        <div className='w-full grid grid-cols-3 gap-5 max-[720px]:grid-cols-1'>

            {statisticsData.map(state => (<StatisticsCard key={state.id} data={state} />))}

        </div>

    </React.Fragment>

}
