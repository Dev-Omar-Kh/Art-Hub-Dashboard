import React from 'react'
import { useTranslation } from 'react-i18next'
import Numbers from '../../../../../services/convertNum';
import ElementBox from '../../../../../components/elements-box/ElementBox';

export default function OverView() {

    const {t, i18n} = useTranslation();

    const lastProductsData = [

        {id: 1, title: 'لوحة زيتية مخصصة', artist: 'احمد محمد', date: '18-1-2025', price: '850', status: 'completedWord'},
        {id: 2, title: 'لوحة مائية حديثة', artist: 'عمر خالد', date: '10-11-2024', price: '1180', status: 'completedWord'},
        {id: 3, title: 'رسم بالفحم لمنظر طبيعي', artist: 'ليلى علي', date: '5-2-2025', price: '990', status: 'progressWord'},
        {id: 4, title: 'بورتريه كلاسيكي', artist: 'سارة محمود', date: '22-3-2025', price: '1250', status: 'completedWord'},

    ]

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('lastOrdersWord')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {lastProductsData.map( order => <div 
                    key={order.id}
                    className='
                        w-full p-2.5 flex items-center justify-between 
                        rounded-md bg-[var(--light-gray-color)] 
                        max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-5
                    '
                >

                    <div className='flex flex-col gap-1'>

                        <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t(order.title)}</h3>

                        <p className='text-base font-medium text-[var(--gray-color)] flex items-center gap-1'>
                            <span className='text-[var(--dark-blue-color)]'>{t('theArtistWord')}: </span>
                            {t(order.artist)}
                        </p>

                        <p className='text-base font-medium text-[var(--gray-color)]'>
                            {order.date.split('-').map(num => Numbers(num, i18n.language, true)).join(' - ')}
                        </p>

                    </div>

                    <div 
                        className='
                            h-full flex flex-col items-center justify-between gap-2.5
                            max-[400px]:flex-row max-[400px]:w-full max-[400px]:items-center
                        '
                    >

                        <div className='w-fit text-lg font-semibold text-[var(--dark-blue-color)]'>
                            {`${Numbers(order.price, i18n.language)} ${t('currencyWord')}`}
                        </div>

                        <div className='w-fit'>
                            <ElementBox title={order.status} 
                                bgColor={
                                    order.status === 'completedWord' ? 'var(--light-green-color)'
                                    : order.status === 'progressWord' ? 'var(--light-yellow-color)'
                                    : 'var(--light-red-color)'
                                } 
                                color={
                                    order.status === 'completedWord' ? 'var(--green-color)'
                                    : order.status === 'progressWord' ? 'var(--yellow-color)'
                                    : 'var(--red-color)'
                                } 
                            />
                        </div>

                    </div>

                </div>)}

            </div>

        </div>

    </React.Fragment>

}
