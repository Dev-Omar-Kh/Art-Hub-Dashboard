import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../../constants/endPoints';
import LogsCard from '../../../../../components/cards/LogsCard';
import ArtCardLoading from '../../../../../components/cards/ArtCardLoading';
import EmptyData from '../../../../../components/error/EmptyData';
import PaginationList from '../../../../../components/pagination-list/PaginationList';
import FetchError from '../../../../../components/error/FetchError';

export default function ClientLog() {

    const {id} = useParams();

    // ====== get-artist-logs ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['clientLogs', id, currentPage], 
        `${endpoints.client.baseLink}/${id}/${endpoints.client.logs}?page=${currentPage}&limit=10`
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

    const clientLogData = data?.data?.activities.map(item => ({
        icon: item.icon,
        isOrder: item.type === 'order' ? true : false,
        title: item.title,
        des: item.description,
        date: item.date,
        status: item.status
    }));

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full flex flex-col gap-2.5'>

            {isLoading && Array.from({length: 3}).map((_, idx) => <ArtCardLoading key={idx} />)}

            {clientLogData?.map((notification, idx) => (
                <LogsCard key={idx} notification={notification} />
            ))}

            {clientLogData?.length === 0 && <EmptyData msg={'noLogsYetWord'} />}
            
            {data?.data?.pagination.pages > 1 && 
                <PaginationList 
                    data={data?.data?.pagination} darkBtns={true}
                    currentPage={currentPage} setCurrentPage={setCurrentPage} 
                />
            }

        </div>

    </React.Fragment>

}
