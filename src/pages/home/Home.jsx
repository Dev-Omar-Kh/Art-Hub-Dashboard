import React from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { LuCloudDownload } from 'react-icons/lu'
import { useTranslation } from 'react-i18next';
import Statistics from './statistics/Statistics';
import Numbers from '../../services/convertNum';
import MostArtists from './most-artists/MostArtists';
import AnalysisCard from './analysis/AnalysisCard';

// ====== import-image ====== //

import artistPfp from './../../assets/images/artist.jpg';
import artistPfp2 from './../../assets/images/artist-2.jpg';
import artistPfp3 from './../../assets/images/artist-3.jpg';

export default function Home() {

    const { t, i18n } = useTranslation();

    const homeButtons = [
        // {id: 1, title: 'displayAnalysisWod', color: 'white'},
        {id: 2, title: 'downloadReportWord', icon: <LuCloudDownload/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    // ====== statistics-section-data ====== //

    const statisticsData = [

        {id: 1, title: 'totalUsersWord', value: '12847', percentageChange: '12', status: 'up', color: 'green'},
        {id: 2, title: 'activeArtistsWord', value: '3429', percentageChange: '8', status: 'up', color: 'green'},
        {id: 3, title: 'totalRevenueWord', value: '1545118', percentageChange: '2.5', status: 'down', color: 'red'},

    ];

    // ====== analysis-card-data ====== //

    const rawFilterListData = ['last12MonthWord', 'last9MonthWord', 'last6MonthWord', 'last3MonthWord', 'lastMonthWord'];
    const localizedFilterListData = rawFilterListData.map((key) => {

        if (key === 'lastMonthWord') {
            return t('lastMonthWord');
        }

        const number = key.match(/\d+/)?.[0];
        const localizedNumber = Numbers(number, i18n.language);
        return t('lastXMonthWord', { count: localizedNumber });

    }); 

    const monthsTimeLineData = [
        t("janMonth"), t("febMonth"), t("marMonth"), t("aprMonth"), t("mayMonth"), t("junMonth"), 
        t("julMonth"), t("augMonth"), t("sepMonth"), t("octMonth"), t("novMonth"), t("decMonth")
    ].reverse();

    const analysisData = [

        {
            id: 1,
            title: 'revenueStatistics',
            filterListData: localizedFilterListData,
            statisticsData: [
                {id: 1, title: 'weeklyWord', value: '28900', color: 'var(--green-color)', isMoney: true},
                {id: 2, title: 'monthlyWord', value: '124500', color: 'var(--green-color)', isMoney: true},
                {id: 3, title: 'yearlyWord', value: '847392', color: 'var(--dark-blue-color)', isMoney: true}
            ],
            chartProps: {
                lineColor: '--mid-blue-color',
                startColor: '--mid-mid-blue-color',
                endColor: '--light-mid-blue-color',
                timeLineData : monthsTimeLineData,
                valuesData: [50, 80, 110, 75, 60, 100, 200, 175, 220, 57, 279, 240]
            }
        },

        {
            id: 2,
            title: 'orderStatistics',
            filterListData: localizedFilterListData,
            statisticsData: [
                {id: 1, title: 'rejectedWord', value: '23', color: 'var(--red-color)', isMoney: false},
                {id: 2, title: 'completedWord', value: '1243', color: 'var(--green-color)', isMoney: false},
                {id: 3, title: 'progressWord', value: '89', color: 'var(--dark-blue-color)', isMoney: false}
            ],
            chartProps: {
                lineColor: '--green-color',
                startColor: '--mid-green-color',
                endColor: '--light-green-color',
                timeLineData : monthsTimeLineData,
                valuesData: [25, 64, 18, 20, 75, 35, 44, 10, 77, 18, 55, 128]
            }
        }

    ];

    // ====== mostArtists-section-data ====== //

    const topArtistsData = [

        {
            id: 1, 
            img: artistPfp,
            name: 'احمد محمود',
            type: 'رسم تشكيلي',
            rank: 1,
            achievement: [
                {id: 1, title: 'اعمال', value: '80', isMoney: false},
                {id: 2, title: 'مبيعات', value: '1547', isMoney: true},
                {id: 3, title: 'تقييم', value: '4.9', isMoney: false}
            ]
        },

        {
            id: 2, 
            img: artistPfp2,
            name: 'محمد ابراهيم',
            type: 'النحت',
            rank: 2,
            achievement: [
                {id: 1, title: 'اعمال', value: '45', isMoney: false},
                {id: 2, title: 'مبيعات', value: '12450', isMoney: true},
                {id: 3, title: 'تقييم', value: '4.8', isMoney: false}
            ]
        },

        {
            id: 3, 
            img: artistPfp3,
            name: 'مريم خالد',
            type: 'فن رقمي',
            rank: 3,
            achievement: [
                {id: 1, title: 'اعمال', value: '28', isMoney: false},
                {id: 2, title: 'مبيعات', value: '1175', isMoney: true},
                {id: 3, title: 'تقييم', value: '4.7', isMoney: false}
            ]
        },

    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'homeWord'} slogan={'homePageSlogan'} buttons={homeButtons} />

            <Statistics statisticsData={statisticsData} />

            <div className='w-full grid grid-cols-2 gap-5 max-[1090px]:grid-cols-1 max-[980px]:grid-cols-2 max-[730px]:grid-cols-1'>

                {analysisData.map(item => <AnalysisCard key={item.id} data={item} />)}

            </div>

            <MostArtists data={topArtistsData} />

        </section>

    </React.Fragment>

}
