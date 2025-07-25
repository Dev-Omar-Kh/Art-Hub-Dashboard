import React, { useState } from 'react'
import { LuCloudDownload } from 'react-icons/lu';
import MainTitle from '../../components/Titles/MainTitle';
import StatisticsCard from '../../components/statistics-card/StatisticsCard';
import { useTranslation } from 'react-i18next';
import Numbers from '../../hooks/useConvertNumber';
import ListBtn from '../../components/buttons/ListBtn';
import LineChart from '../../components/charts/LineChart';
import BestSellers from './best-sellers/BestSellers';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import StatisticsLoading from '../../components/statistics-card/StatisticsLoading';
import FetchError from '../../components/error/FetchError';

export default function SalesAnalysis() {

    const {t, i18n} = useTranslation();

    // ====== buttons-data ====== //

    const salesAnalysisButtons = [
        // {id: 1, title: 'displayAnalysisWod', color: 'white'},
        {id: 2, title: 'downloadReportWord', icon: <LuCloudDownload/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    // ====== statistics-data ====== //

    const statisticsRes = useFetchQuery("SalesStatistics", endpoints.salesAnalysis.getStatistics);

    const stats = statisticsRes?.data?.data;
    const statisticsData = [

        {
            id: 1, 
            title: 'totalSalesWord', 
            value: stats?.totalSales.value, 
            isMoney: true, 
            isString: false, 
            percentageChange: stats?.totalSales.percentageChange, 
            status: stats?.totalSales.isPositive ? 'up' : 'down', 
            color: stats?.totalSales.isPositive ? 'green' : 'red'
        },

        {
            id: 2, 
            title: 'ordersCountWord', 
            value: stats?.totalOrders.value, 
            isMoney: false, 
            isString: false, 
            percentageChange: stats?.totalOrders.percentageChange, 
            status: stats?.totalOrders.isPositive ? 'up' : 'down', 
            color: stats?.totalOrders.isPositive ? 'green' : 'red'
        },

        {
            id: 3, 
            title: 'mostArtistSellerWord', 
            value: stats?.topSellingArtist ? stats?.topSellingArtist.name : t('noDataWord'), 
            isMoney: false, 
            isString: true, 
            msg: stats?.topSellingArtist ? stats?.topSellingArtist.value : 0, 
            color: 'green'
        },

    ];

    // ====== chart-data ====== //

    const [period, setPeriod] = useState({months: '12months'});
    const analysisRes = useFetchQuery(
        ["salesAnalysis", period.months], 
        `${endpoints.salesAnalysis.trendData}?period=${period.months}`
    );

    const rawFilterListData = ['last12MonthWord', 'last9MonthWord', 'last6MonthWord', 'last3MonthWord'];
    const localizedFilterListData = rawFilterListData.map((key) => {

        if (key === 'lastMonthWord') {
            return {
                label: t('lastMonthWord'),
                value: '1month',
            };
        }

        const number = key.match(/\d+/)?.[0];
        const localizedNumber = Numbers(number, i18n.language); 

        return {
            label: t('lastXMonthWord', { count: localizedNumber }),
            value: `${number}months`,
        };

    });
    const filterListData = { data: localizedFilterListData, key: 'months' }

    const chartProps = {
        lineColor: '--mid-blue-color',
        startColor: '--mid-mid-blue-color',
        endColor: '--light-mid-blue-color',
        timeLineData: analysisRes?.data?.data?.chartData?.map(time => time.month),
        valuesData: analysisRes?.data?.data?.chartData?.map(data => data.sales),
    }

    // ====== top-artists-data ====== //

    const topArtistsRes = useFetchQuery("topSellers", endpoints.salesAnalysis.topArtists);

    console.log(topArtistsRes.data?.data?.artists);
    

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'salesAnalysisWord'} slogan={'salesAnalysisPageSlogan'} buttons={salesAnalysisButtons} />

            {statisticsRes.isError && analysisRes.isError && topArtistsRes.isError && <FetchError className='w-full h-full' />}

            {!statisticsRes.isError && !analysisRes.isError && !topArtistsRes.isError && <React.Fragment>

                { statisticsRes.isError && <FetchError className='w-full h-fit' />}
                {!statisticsRes.isError && <div className='w-full grid grid-cols-3 gap-5 max-[720px]:grid-cols-1'>

                    {statisticsRes.isPending && Array.from({length: 3}, (_, idx) => (
                        <StatisticsLoading key={idx} />
                    ))}

                    {statisticsRes.data && statisticsData.map(stat => <StatisticsCard key={stat.id} data={stat} />)}

                </div>}

                {analysisRes.isError && <FetchError className='w-full h-fit' />}
                {!analysisRes.isError && <div 
                    className='
                        relative p-5 rounded-2xl bg-[var(--white-color)] flex flex-col gap-5 
                        shadow-[0_0px_10px_var(--shadow-black-color)] overflow-hidden
                    '
                >

                    {analysisRes.isPending && <div className='absolute top-0 left-0 w-full h-full bg-[var(--white-color)] z-10 opacity-50'>
                        
                    </div>}

                    <div className='w-full flex items-center justify-between gap-5'>

                        <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('trackSalesWord')}</h3>

                        <ListBtn listData={filterListData.data} 
                            filterKey={filterListData.key}
                            onFilterChange={(key, value) => setPeriod(prev => ({ ...prev, [key]: value }))}
                        />

                    </div>

                    <LineChart valuesData={chartProps.valuesData}
                        lineColor={chartProps.lineColor} timeLineData={chartProps.timeLineData} 
                        startColor={chartProps.startColor} endColor={chartProps.endColor} 
                    />

                </div>}

                <BestSellers 
                    data={topArtistsRes.data?.data?.artists} 
                    isLoading={topArtistsRes.isPending} isError={topArtistsRes.isError} 
                />

            </React.Fragment>}

        </section>

    </React.Fragment>

}
