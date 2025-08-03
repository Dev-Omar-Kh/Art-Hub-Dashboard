import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WorkCard from '../../../../../components/cards/WorkCard';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { useParams } from 'react-router-dom';
import { endpoints } from '../../../../../constants/endPoints';
import WorkCardLoading from '../../../../../components/cards/WorkCardLoading';
import FetchError from '../../../../../components/error/FetchError';
import EmptyData from '../../../../../components/error/EmptyData';
import PaginationList from '../../../../../components/pagination-list/PaginationList';

export default function ArtistWorks() {

    const {t} = useTranslation();
    const {id} = useParams();

    // ====== get-artist-data ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['artistWorks', id, currentPage], 
        `${endpoints.artist.baseLink}/${id}/${endpoints.artist.getWorks}?page=${currentPage}&limit=10`
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

    return <React.Fragment>

        <div id='mainScroll' className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('allArtistWorksWord')}</h3>

            {isError && <FetchError className='w-full h-fit' />}

            {!isError && <div className='w-full grid grid-cols-3 gap-2.5 max-[1110px]:grid-cols-2 max-[590px]:grid-cols-1'>

                {isLoading && Array.from({length: 3}).map((_, idx) => <WorkCardLoading key={idx} />)}

                {data?.data?.artworks.length > 0 && data?.data?.artworks.map((pro, idx) => <WorkCard key={idx} data={pro} />)}

            </div>}

            {data?.data?.artworks.length === 0 && <EmptyData msg={'noWorksYetWord'} />}

            {data?.data?.pagination.pages > 1 && 
                <PaginationList 
                    data={data?.data?.pagination} darkBtns={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage} 
                    />
            }

        </div>

    </React.Fragment>

}
