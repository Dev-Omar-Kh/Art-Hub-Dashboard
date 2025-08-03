import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import Numbers from '../../../../../hooks/useConvertNumber';
import ArtCard from '../../../../../components/cards/ArtCard';
import StarRating from '../../../../../components/star-rating/StarRating';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../../constants/endPoints';
import { useParams } from 'react-router-dom';
import PaginationList from '../../../../../components/pagination-list/PaginationList';
import EmptyData from '../../../../../components/error/EmptyData';
import ArtCardLoading from '../../../../../components/cards/ArtCardLoading';
import FetchError from '../../../../../components/error/FetchError';

export default function ClientRates() {

    const {id} = useParams();
    const { t, i18n } = useTranslation();

    // ====== get-client-rate ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['clientRates', id, currentPage], 
        `${endpoints.client.baseLink}/${id}/${endpoints.client.reviews}?page=${currentPage}&limit=10`
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
        title: item.artworkTitle,
        artist: item.artistName,
        date: item.createdAt,
        rate: item.rating,
        comment: item.comment
    }));

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('addedRatesWord')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {isLoading && Array.from({length: 3}).map((_, idx) => <ArtCardLoading key={idx}/>)}

                {ratesData?.map( rate => <ArtCard key={rate.id} date={false} comment={true} order={rate}>

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

                </ArtCard>)}

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
