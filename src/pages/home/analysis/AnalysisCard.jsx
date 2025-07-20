import React from 'react'
import { useTranslation } from 'react-i18next'
import ListBtn from '../../../components/buttons/ListBtn';
import Numbers from '../../../services/convertNum';
import CurrencyImage from '../../../components/currency/CurrencyImage';
import LineChart from './../../../components/charts/LineChart';

export default function AnalysisCard({data}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div className='p-5 rounded-2xl bg-[var(--white-color)] flex flex-col gap-5 shadow-[0_0px_10px_var(--shadow-black-color)]'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t(data.title)}</h3>

                <ListBtn 
                    listData={data.filterListData.data} 
                    filterKey={data.filterListData.ke}
                    onFilterChange={() => console.log('filter')}
                />

            </div>

            <div className='w-full grid grid-cols-3 gap-2.5 max-[1210px]:grid-cols-1 max-[1090px]:grid-cols-3 max-[415px]:grid-cols-1'>

                {data.statisticsData.map(item => (
                    <div 
                        key={item.id} 
                        className='p-5 flex flex-col justify-center items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]'
                    >

                        <h3 className={`text-base font-bold text-[var(--gray-color)]`}>{t(item.title)}</h3>

                        <p className={`flex items-center gap-1 text-xl font-semibold text-center`} style={{color: item.color}}>
                            {`${Numbers(item.value, i18n.language)}`}
                            {item.isMoney && <CurrencyImage 
                                width={'w-5'} 
                                color={item.color === 'var(--green-color)' ? 'green' : 'blue'} 
                            />}
                        </p>

                    </div>
                ))}

            </div>

            <div className='w-full'>
                <LineChart 
                    lineColor={data.chartProps.lineColor} timeLineData={data.chartProps.timeLineData}
                    startColor={data.chartProps.startColor} endColor={data.chartProps.endColor} 
                    valuesData={data.chartProps.valuesData}
                />
            </div>

        </div>

    </React.Fragment>

}
