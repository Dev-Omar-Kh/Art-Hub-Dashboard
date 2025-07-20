import React from 'react'
import { useTranslation } from 'react-i18next'
import ListBtn from '../../../components/buttons/ListBtn';
import Numbers from './../../../services/convertNum';
import CurrencyImage from './../../../components/currency/CurrencyImage';

export default function MostArtists({data}) {

    const {t, i18n} = useTranslation();

    const yearsTimeLineData = [2025, 2024, 2023, 2022].map(year => ({
        label: Numbers(year, i18n.language, true),
        value: Numbers(year, i18n.language, true),
    }));

    const monthsTimeLineData = [
        "janMonth", "febMonth", "marMonth", "aprMonth", "mayMonth", "junMonth",
        "julMonth", "augMonth", "sepMonth", "octMonth", "novMonth", "decMonth"
    ].map((key, index) => ({
        label: t(key),
        value: index + 1,
    }));

    const filtersData = [
        {id: 1, data: yearsTimeLineData, key: 'year'},
        {id: 2, data: monthsTimeLineData, key: 'month'},
    ]

    return <React.Fragment>

        <div className='w-full p-5 flex flex-col gap-5 rounded-2xl bg-[var(--white-color)]'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('mostArtistsTitle')}</h3>

                <div className='flex items-center gap-2.5'>

                    {filtersData.map(list => <ListBtn 
                        listData={list.data}
                        key={list.key}
                        onFilterChange={() => console.log('tops')}
                    />)}

                </div>

            </div>

            <div 
                className='
                    w-full grid [grid-template-columns:1fr_1.25fr_1fr] items-center gap-5
                    max-[1125px]:[grid-template-columns:1fr_1fr_1fr] max-[675px]:grid-cols-1
                '
            >

                {data.map(card => <div 
                    key={card.id}
                    className={`
                        relative h-fit p-5 flex flex-col items-center justify-center gap-5 
                        ${
                            card.rank === 1 
                            ? 'order-2 py-10 max-[675px]:order-1 max-[675px]:py-5' 
                            : card.rank === 2 ? 'order-1 max-[675px]:order-2' 
                            : 'order-3 max-[675px]:order-3'
                        }
                        bg-[var(--light-gray-color)] rounded-md border border-[var(--sky-blue-color)]
                    `}
                >

                    <div className='absolute start-2.5 top-2.5 px-2.5 rounded-md bg-[var(--dark-blue-color)]'>
                        <p className='text-base font-medium text-[var(--white-color)]'>{Numbers(card.rank, i18n.language)}</p>
                    </div>

                    <div className='p-1 rounded-full w-28 h-28 border-5 border-[var(--sky-blue-color)] overflow-hidden'>
                        <img 
                            className='w-full h-full object-cover rounded-full' 
                            src={card.img} alt={`${card.name} Image`} loading='lazy'
                        />
                    </div>

                    <div className='flex flex-col justify-center items-center'>
                        <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{card.name}</h3>
                        <p className='text-base text-[var(--gray-color)]'>{card.type}</p>
                    </div>

                    <div 
                        className='
                            w-full pt-2.5 flex flex-wrap items-center justify-between 
                            border-t-2 border-[var(--sky-blue-color)]
                            max-[675px]:gap-10 max-[675px]:justify-center
                        '
                    >

                        {card.achievement.map((ach) => (
                            <div key={ach.id} className='flex flex-col items-center justify-center'>
                                <p className='flex items-center gap-1 text-lg font-semibold text-[var(--dark-blue-color)]'>
                                    {Numbers(ach.value, i18n.language)} 
                                    {ach.isMoney && <CurrencyImage 
                                        width={'w-4'}
                                        color='blue'
                                    />}
                                </p>
                                <p className='text-base text-[var(--gray-color)]'>{ach.title}</p>
                            </div>
                        ))}

                    </div>

                </div>)}

            </div>

        </div>

    </React.Fragment>

}
