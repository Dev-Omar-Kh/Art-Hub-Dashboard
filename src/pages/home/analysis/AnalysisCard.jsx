import React from 'react'
import { useTranslation } from 'react-i18next'
import Numbers from '../../../hooks/useConvertNumber';
import CurrencyImage from '../../../components/currency/CurrencyImage';
import LineChart from './../../../components/charts/LineChart';
import LoadingRow from '../../../components/loading-row/LoadingRow';
import FetchError from '../../../components/error/FetchError';

export default function AnalysisCard({data, isLoading}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div className='p-5 rounded-2xl bg-[var(--light-gray-color)] flex flex-col gap-5'>

            {isLoading && <div className='flex flex-col gap-5'>

                <div 
                    className='
                        w-full grid grid-cols-3 gap-2.5 max-[1210px]:grid-cols-1
                        max-[1090px]:grid-cols-3 max-[415px]:grid-cols-1
                    '
                >

                    {Array.from({length: 3}).map((_, idx) => <LoadingRow key={idx} className='h-20 rounded-md' />)}

                </div>

            </div>}

            {!isLoading && <React.Fragment>

                <div 
                    className='
                        w-full grid grid-cols-3 gap-2.5 max-[1210px]:grid-cols-1
                        max-[1090px]:grid-cols-3 max-[415px]:grid-cols-1
                    '
                >

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

            </React.Fragment>}

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
