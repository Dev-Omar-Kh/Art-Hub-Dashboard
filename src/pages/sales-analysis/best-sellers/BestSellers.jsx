import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from '../../../components/table/Table';

// ====== import-images ====== //

import userPfp from '../../../assets/images/artist.jpg';
import Numbers from '../../../hooks/useConvertNumber';
import { IoArrowUpOutline } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { HiArrowTrendingDown, HiArrowTrendingUp } from 'react-icons/hi2';
import { ROUTES } from '../../../constants/routes';

const tableData = {

    columns: ['artistWord', 'artistTypeWord', 'orderCountWord', 'sealsCountWord', 'growthWord', 'profileWord'],

    data: [

        {
            id: 1,
            artist: 'أحمد محمد',
            artistType: 'فنان تشكيلي',
            orderCount: 25,
            sealsCount: 20,
            growth: '12',
            isUp: true
        },

        {
            id: 2,
            artist: 'عمر خالد',
            artistType: 'رسام رقمي',
            orderCount: 30,
            sealsCount: 22,
            growth: '8',
            isUp: true
        },

        {
            id: 3,
            artist: 'ليلى علي',
            artistType: 'فنانة بالفحم',
            orderCount: 18,
            sealsCount: 17,
            growth: '5',
            isUp: true
        },

        {
            id: 4,
            artist: 'سارة محمود',
            artistType: 'رسامة بورتريه',
            orderCount: 40,
            sealsCount: 35,
            growth: '15',
            isUp: true
        },

        {
            id: 5,
            artist: 'محمود حسن',
            artistType: 'فنان تجريدي',
            orderCount: 28,
            sealsCount: 21,
            growth: '9',
            isUp: true
        },

        {
            id: 6,
            artist: 'نورا إبراهيم',
            artistType: 'رسامة مناظر طبيعية',
            orderCount: 22,
            sealsCount: 15,
            growth: '3',
            isUp: false
        },

        {
            id: 7,
            artist: 'كريم مصطفى',
            artistType: 'رسام واقعي',
            orderCount: 35,
            sealsCount: 30,
            growth: '11',
            isUp: true
        },

        {
            id: 8,
            artist: 'هدى عصام',
            artistType: 'فنانة بانورامية',
            orderCount: 16,
            sealsCount: 14,
            growth: '6',
            isUp: true
        },

        {
            id: 9,
            artist: 'ياسر أحمد',
            artistType: 'فنان تعبيري',
            orderCount: 19,
            sealsCount: 12,
            growth: '4',
            isUp: false
        },

        {
            id: 10,
            artist: 'أميرة سامي',
            artistType: 'فنانة بالحبر',
            orderCount: 27,
            sealsCount: 22,
            growth: '10',
            isUp: true
        },

        {
            id: 11,
            artist: 'حسن علاء',
            artistType: 'رسام عصري',
            orderCount: 21,
            sealsCount: 16,
            growth: '7',
            isUp: true
        },

        {
            id: 12,
            artist: 'نجلاء عبد الحليم',
            artistType: 'رسامة مناظر طبيعية',
            orderCount: 32,
            sealsCount: 30,
            growth: '13',
            isUp: true
        },

        {
            id: 13,
            artist: 'رامي السيد',
            artistType: 'رسام خيالي',
            orderCount: 24,
            sealsCount: 20,
            growth: '4',
            isUp: true
        },

        {
            id: 14,
            artist: 'إيمان خالد',
            artistType: 'فنانة تجريدية',
            orderCount: 15,
            sealsCount: 13,
            growth: '2',
            isUp: false
        },

        {
            id: 15,
            artist: 'طارق عبد الله',
            artistType: 'رسام رومانسي',
            orderCount: 29,
            sealsCount: 26,
            growth: '9',
            isUp: true
        }

    ]

}

export default function BestSellers({data, isLoading, isError}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5 p-5 rounded-2xl bg-[var(--white-color)]'>

            <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('topArtistsSellerWord')}</h3>

            <div className='w-full rounded-2xl overflow-hidden'>

                <Table data={data}
                    columns={tableData.columns}
                    isLoading={isLoading} isError={isError}
                    emptyMsg={'noArtistsDataWord'}
                    actions={false} tHeadColor={'var(--light-gray-color)'}
                    renderRow={(artist) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                <div className='w-fit flex items-center gap-2.5'>
                                    <img
                                        className='
                                            w-10 h-10 min-w-10 min-h-10 rounded-full object-cover 
                                            border border-[var(--dark-blue-color)]
                                        '
                                        src={userPfp} alt={`${artist.artist} image`} loading='lazy' 
                                    />
                                    <p>{artist.name}</p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {artist.job}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {Numbers(artist.orders, i18n.language)}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {Numbers(artist.sales, i18n.language)}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-full flex items-center justify-center gap-1'>
                                    {artist.growth.isPositive 
                                        ? <HiArrowTrendingUp className='text-xl text-[var(--green-color)]' /> 
                                        : <HiArrowTrendingDown className='text-xl text-[var(--red-color)]' />
                                    }
                                    <p 
                                        className={`
                                            text-base font-medium 
                                            ${artist.growth.isPositive ? 'text-[var(--green-color)]' : 'text-[var(--red-color)]'}
                                        `}
                                        >
                                        {`${artist.growth.isPositive ? '+' : '-'}${Numbers(artist.growth.sales, i18n.language)}`}
                                    </p>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <Link 
                                        to={`${ROUTES.USERS_ROUTE}/${ROUTES.ARTIST_PROFILE_ROUTE}/${artist._id}`}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--mid-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewProfileWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </Link>
                                </div>
                            </td>

                        </React.Fragment>
                    )}
                />

            </div>

        </div>

    </React.Fragment>

}
