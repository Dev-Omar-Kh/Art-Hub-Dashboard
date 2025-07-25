import React from 'react'
import { useTranslation } from 'react-i18next';
import Numbers from '../../../../../hooks/useConvertNumber';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import ArtCard from '../../../../../components/cards/ArtCard';
import StarRating from '../../../../../components/star-rating/StarRating';

export default function ClientRates() {

    const { t, i18n } = useTranslation();

    const ratesData = [
        {
            id: 1,
            title: 'لوحة زيتية مخصصة',
            artist: 'احمد محمد',
            date: '18-1-2025',
            rate: 4,
            comment: 'عمل رائع جدًا ويستحق التقدير.'
        },
        {
            id: 2,
            title: 'لوحة مائية حديثة',
            artist: 'عمر خالد',
            date: '10-11-2024',
            rate: 3.5,
            comment: 'العمل جيد، لكن هناك مجال للتحسين.'
        },
        {
            id: 3,
            title: 'رسم بالفحم لمنظر طبيعي',
            artist: 'ليلى علي',
            date: '5-2-2025',
            rate: 5,
            comment: 'تحفة فنية بكل المقاييس!'
        },
        {
            id: 4,
            title: 'بورتريه كلاسيكي',
            artist: 'سارة محمود',
            date: '22-3-2025',
            rate: 4.5,
            comment: 'عمل ممتاز واحترافي جدًا.'
        }
    ];

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('addedRatesWord')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {ratesData.map( rate => <ArtCard key={rate.id} date={false} comment={true} order={rate}>

                    <div
                        className='
                            h-full flex flex-col items-center justify-between gap-2.5
                            max-[400px]:flex-row max-[400px]:w-full max-[400px]:items-center
                        '
                    >

                        <StarRating rate={rate.rate} />

                        <p className='text-base font-medium text-[var(--gray-color)]'>
                            {rate.date.split('-').map((item) => (
                                Numbers(item, i18n.language, true)
                            )).reverse().join(' - ')}
                        </p>

                    </div>

                </ArtCard>)}

            </div>

        </div>

    </React.Fragment>

}
