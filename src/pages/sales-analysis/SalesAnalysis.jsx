import React from 'react'
import { LuCloudDownload } from 'react-icons/lu';
import MainTitle from '../../components/Titles/MainTitle';
import StatisticsCard from '../../components/statistics-card/StatisticsCard';
import { useTranslation } from 'react-i18next';
import Numbers from '../../services/convertNum';
import ListBtn from '../../components/buttons/ListBtn';
import LineChart from '../../components/charts/LineChart';
import BestSellers from './best-sellers/BestSellers';

export default function SalesAnalysis() {

    const {t, i18n} = useTranslation();

    // ====== buttons-data ====== //

    const salesAnalysisButtons = [
        // {id: 1, title: 'displayAnalysisWod', color: 'white'},
        {id: 2, title: 'downloadReportWord', icon: <LuCloudDownload/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    // ====== statistics-data ====== //

    const statisticsData = [

        {id: 1, title: 'totalSalesWord', value: '12847', isMoney: true, isString: false, percentageChange: '12', status: 'up', color: 'green'},
        {id: 2, title: 'ordersCountWord', value: '168', isMoney: false, isString: false, percentageChange: '8', color: 'red'},
        {id: 3, title: 'mostArtistSellerWord', value: 'أحمد محمد', isMoney: false, isString: true, msg: '125000', color: 'green'},

    ];

    // ====== filter-data ====== //

    const rawFilterListData = ['last12MonthWord', 'last9MonthWord', 'last6MonthWord', 'last3MonthWord', 'lastMonthWord'];
    const localizedFilterListData = rawFilterListData.map((key) => {

        if (key === 'lastMonthWord') {
            return t('lastMonthWord');
        }

        const number = key.match(/\d+/)?.[0];
        const localizedNumber = Numbers(number, i18n.language);
        return t('lastXMonthWord', { count: localizedNumber });

    }); 

    // ====== chart-data ====== //

    const timeLineData = [
        t("janMonth"), t("febMonth"), t("marMonth"), t("aprMonth"), t("mayMonth"), t("junMonth"), 
        t("julMonth"), t("augMonth"), t("sepMonth"), t("octMonth"), t("novMonth"), t("decMonth")
    ].reverse();
    const valuesData = [50, 80, 110, 75, 60, 100, 200, 175, 220, 57, 279, 240]

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'salesAnalysisWord'} slogan={'salesAnalysisPageSlogan'} buttons={salesAnalysisButtons} />

            <div className='w-full grid grid-cols-3 gap-5 max-[720px]:grid-cols-1'>

                {statisticsData.map(stat => <StatisticsCard key={stat.id} data={stat} />)}

            </div>

            <div 
                className='p-5 rounded-2xl bg-[var(--white-color)] flex flex-col gap-5 shadow-[0_0px_10px_var(--shadow-black-color)]'
            >

                <div className='w-full flex items-center justify-between gap-5'>

                    <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('trackSalesWord')}</h3>

                    <ListBtn listData={localizedFilterListData} />

                </div>

                <LineChart valuesData={valuesData}
                    lineColor={'--mid-blue-color'} timeLineData={timeLineData} 
                    startColor={'--mid-mid-blue-color'} endColor={'--light-mid-blue-color'} 
                />

            </div>

            <BestSellers />

        </section>

    </React.Fragment>

}
