import React, { useState } from 'react';
import MainTitle from '../../components/Titles/MainTitle';
import { LuCloudDownload } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import Statistics from './statistics/Statistics';
import Numbers from '../../hooks/useConvertNumber';
import MostArtists from './most-artists/MostArtists';
import { useFetchQuery } from './../../hooks/useFetchQuery';
import { endpoints } from '../../constants/endPoints';
import Analysis from './analysis/Analysis';

export default function Home() {

    const { t, i18n } = useTranslation();

    const homeButtons = [
        // {id: 1, title: 'displayAnalysisWod', color: 'white'},
        {id: 2, title: 'downloadReportWord', icon: <LuCloudDownload/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    // ====== statistics-section-data ====== //

    const statisticsRes = useFetchQuery("statistics", endpoints.home.statistics);

    const statsKeys = [
        { id: 1, key: 'totalUsers', title: 'totalUsersWord' },
        { id: 2, key: 'activeArtists', title: 'activeArtistsWord' },
        { id: 3, key: 'totalRevenue', title: 'totalRevenueWord' },
    ];

    const statisticsData = statsKeys.map(({ id, key, title }) => {
        const stat = statisticsRes.data?.data?.[key] || {};
        return {
            id,
            title,
            value: stat.value,
            percentageChange: stat.percentageChange,
            status: stat.isPositive ? 'up' : 'down',
            color: stat.isPositive ? 'green' : 'red',
        };
    });

    // ====== analysis-card-data ====== //

    const [period, setPeriod] = useState({months: '12months'});
    const analysisRes = useFetchQuery(["analysis", period.months], `${endpoints.home.analysis}?period=${period.months}`);

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

    const getStatisticsData = (summary, config) => {

        if (!summary) return [];

        return config.map((item, index) => ({
            id: index + 1,
            title: item.title,
            value: summary[item.key],
            color: item.color,
            isMoney: item.isMoney,
        }));

    };
    const filterListData = { data: localizedFilterListData, key: 'months' };
    const analysisData = [

        {
            id: 1,
            title: 'revenueStatistics',
            statisticsData: getStatisticsData(analysisRes?.data?.data.revenue.summary, [
                { title: 'weeklyWord', key: 'weekly', color: 'var(--green-color)', isMoney: true },
                { title: 'monthlyWord', key: 'monthly', color: 'var(--green-color)', isMoney: true },
                { title: 'yearlyWord', key: 'yearly', color: 'var(--dark-blue-color)', isMoney: true },
            ]),
            chartProps: {
                lineColor: '--mid-blue-color',
                startColor: '--mid-mid-blue-color',
                endColor: '--light-mid-blue-color',
                timeLineData: analysisRes?.data?.data.revenue.chartData.map(time => time.month),
                valuesData: analysisRes?.data?.data.revenue.chartData.map(data => data.value),
            }
        },

        {
            id: 2,
            title: 'orderStatistics',
            statisticsData: getStatisticsData(analysisRes?.data?.data.orders.summary, [
                { title: 'rejectedWord', key: 'rejected', color: 'var(--red-color)', isMoney: false },
                { title: 'completedWord', key: 'completed', color: 'var(--green-color)', isMoney: false },
                { title: 'progressWord', key: 'inProgress', color: 'var(--dark-blue-color)', isMoney: false },
            ]),
            chartProps: {
                lineColor: '--green-color',
                startColor: '--mid-green-color',
                endColor: '--light-green-color',
                timeLineData: analysisRes?.data?.data.orders.chartData.map(time => time.month),
                valuesData: analysisRes?.data?.data.orders.chartData.map(data => data.value),
            }
        }

    ];

    // ====== mostArtists-section-data ====== //

    const topArtistsRes = useFetchQuery("topArtists", endpoints.home.topArtists);

    const topArtistsData = topArtistsRes?.data?.data.map((artist, idx) => ({
        id: artist._id,
        img: artist.profileImage.url,
        name: artist.displayName,
        type: artist.job,
        rank: idx + 1,
        achievement: [
            {id: 1, title: 'worksWord', value: artist.performance.artworks, isMoney: false},
            {id: 2, title: 'salesWord', value: artist.performance.sales, isMoney: true},
            {id: 3, title: 'rateWord', value: artist.performance.rating, isMoney: false}
        ]
    }));

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle 
                title={'homeWord'} 
                slogan={'homePageSlogan'} buttons={homeButtons} 
            />

            <Statistics 
                statisticsData={statisticsData} 
                isLoading={statisticsRes.isLoading} isError={statisticsRes.isError} 
            />

            <Analysis 
                data={analysisData} filterListData={filterListData} setPeriod={setPeriod}
                isLoading={analysisRes.isLoading} isError={analysisRes.isError} 
            />

            <MostArtists 
                data={topArtistsData} 
                isLoading={topArtistsRes.isLoading} isError={topArtistsRes.isError} 
            />

        </section>

    </React.Fragment>

}