import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ArtCard from '../../../../../components/cards/ArtCard';
import StarRating from '../../../../../components/star-rating/StarRating';
import Numbers from '../../../../../hooks/useConvertNumber';
import { useParams } from 'react-router-dom';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../../constants/endPoints';
import FetchError from '../../../../../components/error/FetchError';
import ArtCardLoading from '../../../../../components/cards/ArtCardLoading';
import EmptyData from '../../../../../components/error/EmptyData';
import PaginationList from '../../../../../components/pagination-list/PaginationList';

export default function ArtistRates() {

    const {id} = useParams();
    const {t, i18n} = useTranslation();

    // ====== get-artist-rate ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['artistRates', id, currentPage], 
        `${endpoints.artist.baseLink}/${id}/${endpoints.artist.reviews}?page=${currentPage}&limit=10`
    );

    useEffect(() => {

        if (prevPage.current !== currentPage) {
            const main = document.querySelector('#ScrollTop');
            if (main) {
                main.scrollIntoView({ behavior: 'smooth' });
            }
        }

        prevPage.current = currentPage;

    }, [currentPage]);

    const ratesData = data?.data?.reviews?.map(item => ({
        id: item._id,
        title: item.artwork.title,
        client: item.user.displayName,
        date: item.createdAt,
        rate: item.rating,
        comment: item.comment
    }));

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('clientsRates')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {isLoading && Array.from({length: 3}).map((_, idx) => <ArtCardLoading key={idx}/>)}

                {ratesData?.length > 0 && ratesData?.map( (rate, idx) => (
                    <ArtCard key={idx} date={false} comment={true} order={rate} isArtist={true}>
                        <div
                            className='
                                h-full flex flex-col items-center justify-between gap-2.5
                                max-[400px]:flex-row max-[400px]:w-full max-[400px]:items-center
                            '
                        >

                            <StarRating rate={rate.rate} />

                            <p className='text-base font-medium text-[var(--gray-color)]'>
                                {rate.date.split('T')[0].split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </p>

                        </div>
                    </ArtCard>
                ))}

                {ratesData?.length === 0 && <EmptyData msg={'noRatesYetWord'} />}

            </div>

            {data?.data?.pagination.pages > 1 && 
                <PaginationList 
                    data={data?.data?.pagination} darkBtns={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage} 
                    />
            }

        </div>

    </React.Fragment>

}
