import React from 'react'
import { useTranslation } from 'react-i18next'
import Numbers from '../../../../../hooks/useConvertNumber';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import ArtCard from '../../../../../components/cards/ArtCard';
import CurrencyImage from '../../../../../components/currency/CurrencyImage';

export default function OverView() {

    const {t, i18n} = useTranslation();

    const lastProductsData = [

        {id: 1, title: 'لوحة زيتية مخصصة', artist: 'احمد محمد', date: '18-1-2025', price: '850', status: 'completedWord'},
        {id: 2, title: 'لوحة مائية حديثة', artist: 'عمر خالد', date: '10-11-2024', price: '1180', status: 'rejectedWord'},
        {id: 3, title: 'رسم بالفحم لمنظر طبيعي', artist: 'ليلى علي', date: '5-2-2025', price: '990', status: 'progressWord'},
        {id: 4, title: 'بورتريه كلاسيكي', artist: 'سارة محمود', date: '22-3-2025', price: '1250', status: 'completedWord'},

    ];

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('lastOrdersWord')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {lastProductsData.map( order => <ArtCard key={order.id} order={order}>

                    <div 
                        className='
                            h-full flex flex-col items-center justify-between gap-2.5
                            max-[400px]:flex-row max-[400px]:w-full max-[400px]:items-center
                        '
                    >

                        <div className='w-fit flex items-center gap-1 text-lg font-semibold text-[var(--dark-blue-color)]'>
                            {`${Numbers(order.price, i18n.language)}`}
                            <CurrencyImage width={'w-3.5'} color='blue' />
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

                </ArtCard>)}

            </div>

        </div>

    </React.Fragment>

}
