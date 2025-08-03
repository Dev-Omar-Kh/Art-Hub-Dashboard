import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ListBtn from '../../../components/buttons/ListBtn';
import Numbers from './../../../hooks/useConvertNumber';
import CurrencyImage from './../../../components/currency/CurrencyImage';
import CardLoading from './CardLoading';
import FetchError from '../../../components/error/FetchError';
import { useFetchQuery } from '../../../hooks/useFetchQuery';
import { endpoints } from '../../../constants/endPoints';
import EmptyData from '../../../components/error/EmptyData';

export default function MostArtists() {

    const {t, i18n} = useTranslation();

    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;

    const [filters, setFilters] = useState({
        year: currentYear,
        month: currentMonth
    });

    const years = [];
    for (let y = 2023; y <= currentYear; y++) {
        years.push({ label: Numbers(y, i18n.language, true), value: y });
    }

    const monthsTimeLineData = [
        "janMonth", "febMonth", "marMonth", "aprMonth", "mayMonth", "junMonth",
        "julMonth", "augMonth", "sepMonth", "octMonth", "novMonth", "decMonth"
    ].map((key, index) => ({
        label: t(key),
        value: index + 1,
    }));

    const filtersData = [
        {id: 1, data: years, key: 'year'},
        {id: 2, data: monthsTimeLineData, key: 'month'},
    ];

    const handleFilterChange = (key, value) => {
        const newFilters = {
            ...filters,
            [key]: value
        };
        setFilters(newFilters);
    };

    // ====== get-most-artists-data ====== //

    const {data, isLoading, isError} = useFetchQuery(
        ["topArtists", filters], 
        `${endpoints.home.topArtists}?limit=3&year=${filters.year}&month=${filters.month}`
    );

    const topArtistsData = data?.data.map((artist, idx) => ({
        id: artist._id,
        img: artist.profileImage.url,
        name: artist.displayName,
        type: artist.job,
        rank: idx + 1,
        achievement: [
            {id: 1, title: 'worksWord', value: artist.performance.artworks, isMoney: false},
            {id: 2, title: 'salesWord', value: artist.performance.sales, isMoney: true},
            {id: 3, title: 'rateWord', value: artist.performance.rating, isMoney: false}
        ],
    }));

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full p-5 flex flex-col gap-5 rounded-2xl bg-[var(--white-color)]'>

            <div className='w-full flex flex-wrap items-center justify-between gap-5'>

                <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('mostArtistsTitle')}</h3>

                <div className='flex items-center gap-2.5'>

                    {filtersData.map(list => <ListBtn 
                        key={list.key}
                        listData={list.data}
                        filterKey={list.key}
                        selectedValue={filters[list.key]}
                        onFilterChange={(key, value) => handleFilterChange(key, value)}
                    />)}

                </div>

            </div>

            <div 
                className='
                    w-full grid [grid-template-columns:1fr_1.25fr_1fr] items-center gap-5
                    max-[1125px]:[grid-template-columns:1fr_1fr_1fr] max-[675px]:grid-cols-1
                '
            >

                {isLoading && Array.from({length: 3}).map((_, idx) => <CardLoading key={idx} />)}

                {!isError && !isLoading && data?.data.length > 0 && topArtistsData.map(card => <div 
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
                                <p className='text-base text-[var(--gray-color)]'>{t(ach.title)}</p>
                            </div>
                        ))}

                    </div>

                </div>)}

            </div>

            {data?.data.length === 0 && <EmptyData msg={'notfoundTopArtistsWord'} />}

        </div>

    </React.Fragment>

}
