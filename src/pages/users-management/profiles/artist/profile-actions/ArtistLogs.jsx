import React, { useEffect, useRef, useState } from 'react';
import Numbers from '../../../../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import ElementBox from '../../../../../components/elements-box/ElementBox';
import { useParams } from 'react-router-dom';
import { useFetchQuery } from '../../../../../hooks/useFetchQuery';
import { endpoints } from '../../../../../constants/endPoints';
import FetchError from '../../../../../components/error/FetchError';
import PaginationList from '../../../../../components/pagination-list/PaginationList';
import EmptyData from '../../../../../components/error/EmptyData';
import ArtCardLoading from '../../../../../components/cards/ArtCardLoading';
import LogsCard from '../../../../../components/cards/LogsCard';

// const clientLogData = [
//     {
//         id: '1234',
//         icon: '🛒',
//         isOrder: true,
//         title: 'طلب جديد',
//         des: 'تم إنشاء طلب جديد بقيمة 250 ريال',
//         date: '15-6-2025 14:30',
//         status: 'completedWord'
//     },
//     {
//         id: '1451',
//         icon: '⭐',
//         isOrder: false,
//         title: 'تقييم جديد',
//         des: 'تم إرسال تقييم 5 نجوم للمنتج',
//         date: '15-6-2025 16:45',
//         status: 'newWord'
//     },
//     {
//         id: '2224',
//         icon: '🔐',
//         isOrder: false,
//         title: 'تسجيل دخول',
//         des: 'تم تسجيل الدخول من الرياض',
//         date: '14-6-2025 09:15',
//         status: 'infoWord'
//     },
//     {
//         id: '12300',
//         icon: '🛒',
//         isOrder: true,
//         title: 'طلب جديد',
//         des: 'تم إنشاء طلب جديد بقيمة 450 ريال',
//         date: '11-6-2025 17:40',
//         status: 'rejectedWord'
//     },
//     {
//         id: '3870',
//         icon: '👤',
//         isOrder: false,
//         title: 'تحديث الملف الشخصي',
//         des: 'تم تحديث معلومات الملف الشخصي',
//         date: '11-6-2025 15:30',
//         status: 'infoWord'
//     }
// ];

export default function ArtistLogs() {

    const {id} = useParams();
    const {t} = useTranslation();

    // ====== get-artist-logs ====== //

    const [currentPage, setCurrentPage] = useState(1);
    const prevPage = useRef(currentPage);

    const {data, isLoading, isError} = useFetchQuery(
        ['artistLogs', id, currentPage], 
        `${endpoints.artist.baseLink}/${id}/${endpoints.artist.logs}?page=${currentPage}&limit=10`
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
    }))

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('clientsRates')}</h3>

            <div className='w-full flex flex-col gap-2.5'>

                {isLoading && Array.from({length: 3}).map((_, idx) => <ArtCardLoading key={idx} />)}

                {clientLogData?.length > 0 && clientLogData?.map((notification, idx) => <LogsCard 
                    key={idx} notification={notification} 
                />)}

                {clientLogData?.length === 0 && <EmptyData msg={'noLogsYetWord'} />}

                {data?.data?.pagination.pages > 1 && 
                    <PaginationList 
                        data={data?.data?.pagination} darkBtns={true}
                        currentPage={currentPage} setCurrentPage={setCurrentPage} 
                        />
                }

            </div>

        </div>

    </React.Fragment>

}
