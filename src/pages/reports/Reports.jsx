import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoBanSharp } from 'react-icons/io5';
import { PiExportBold } from 'react-icons/pi';
import MainTitle from '../../components/Titles/MainTitle';
import Table from '../../components/table/Table';
import Numbers from '../../services/convertNum';
import { IoIosArrowForward } from 'react-icons/io';
import ElementBox from '../../components/elements-box/ElementBox';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import SearchInput from '../../components/inputs/search-input/SearchInput';
import ListBtn from '../../components/buttons/ListBtn';
import PopUp from '../../components/pop-up/PopUp';
import { AnimatePresence } from 'framer-motion';
import PopUpDescription from '../../components/pop-up/pop-up-box/PopUpDescription';

const tableData = {

    columns: ['#', 'complainantWord', 'artistWord', 'reportTypeWord', 'dateWord', 'reportDescriptionWord', 'statusWord', 'actionsWord'],

    data: [

        {
            id: 1,
            complainant: 'منى سالم',
            artist: 'احمد محمد',
            reportType: 'تأخير في التسليم',
            description: 'اللوحة وصلت متأخرة جدًا عن الموعد المتفق عليه.',
            date: '20-1-2025',
            status: 'pendingWord'
        },

        {
            id: 2,
            complainant: 'ياسر فؤاد',
            artist: 'عمر خالد',
            reportType: 'جودة منخفضة',
            description: 'الخامة والجودة لا تتناسب مع السعر.',
            date: '12-11-2024',
            status: 'reviewedWord'
        },

        {
            id: 3,
            complainant: 'هدى إبراهيم',
            artist: 'ليلى علي',
            reportType: 'تواصل غير متاح',
            description: 'لم يتم الرد على استفساراتي أثناء التنفيذ.',
            date: '6-2-2025',
            status: 'resolvedWord'
        },

        {
            id: 4,
            complainant: 'زياد محسن',
            artist: 'سارة محمود',
            reportType: 'خدش في العمل',
            description: 'اللوحة تعرضت لتلف أثناء الشحن.',
            date: '23-3-2025',
            status: 'pendingWord'
        },

        {
            id: 5,
            complainant: 'ريهام عبد الله',
            artist: 'محمود حسن',
            reportType: 'ألوان غير مطابقة',
            description: 'الألوان المستخدمة لا تطابق النموذج المرسل.',
            date: '18-4-2025',
            status: 'rejectedWord'
        },

        {
            id: 6,
            complainant: 'عماد مصطفى',
            artist: 'نورا إبراهيم',
            reportType: 'جودة منخفضة',
            description: 'تفاصيل العمل غير دقيقة والنتيجة غير مرضية.',
            date: '10-5-2025',
            status: 'reviewedWord'
        },

        {
            id: 7,
            complainant: 'مروان خليل',
            artist: 'كريم مصطفى',
            reportType: 'تأخير في التسليم',
            description: 'تم تجاوز تاريخ التسليم دون إشعار.',
            date: '3-6-2025',
            status: 'resolvedWord'
        },

        {
            id: 8,
            complainant: 'شهد مجدي',
            artist: 'هدى عصام',
            reportType: 'مقاس غير صحيح',
            description: 'اللوحة أصغر بكثير من المطلوب.',
            date: '13-6-2025',
            status: 'pendingWord'
        },

        {
            id: 9,
            complainant: 'نهى طارق',
            artist: 'ياسر أحمد',
            reportType: 'جودة منخفضة',
            description: 'العمل لا يرقى إلى مستوى الصور المعروضة.',
            date: '29-6-2025',
            status: 'rejectedWord'
        },

        {
            id: 10,
            complainant: 'سليم حسن',
            artist: 'أميرة سامي',
            reportType: 'خدش في العمل',
            description: 'اللوحة بها علامات واضحة أثرت على جمالها.',
            date: '6-7-2025',
            status: 'reviewedWord'
        },

        {
            id: 11,
            complainant: 'أحمد يونس',
            artist: 'حسن علاء',
            reportType: 'ألوان غير مطابقة',
            description: 'ألوان اللوحة تختلف عن ما تم الاتفاق عليه.',
            date: '20-7-2025',
            status: 'resolvedWord'
        },

        {
            id: 12,
            complainant: 'مها جمال',
            artist: 'نجلاء عبد الحليم',
            reportType: 'تأخير في التسليم',
            description: 'الطلب تأخر بدون أي تبرير.',
            date: '1-8-2025',
            status: 'pendingWord'
        },

        {
            id: 13,
            complainant: 'فاطمة حسين',
            artist: 'رامي السيد',
            reportType: 'ألوان غير مطابقة',
            description: 'تدرجات الألوان مختلفة كليًا عما تم عرضه.',
            date: '10-8-2025',
            status: 'reviewedWord'
        },

        {
            id: 14,
            complainant: 'ليلى سمير',
            artist: 'إيمان خالد',
            reportType: 'مقاس غير صحيح',
            description: 'المقاسات كانت خاطئة ولم يتم تصحيحها.',
            date: '24-8-2025',
            status: 'resolvedWord'
        },

        {
            id: 15,
            complainant: 'سارة شكري',
            artist: 'طارق عبد الله',
            reportType: 'تواصل غير متاح',
            description: 'الفنان لم يرد على الرسائل رغم المحاولات المتكررة.',
            date: '3-9-2025',
            status: 'pendingWord'
        }
    ]

}

export default function Reports() {

    const {t, i18n} = useTranslation();

    // ====== buttons-data ====== //

    const usersButtons = [
        {id: 2, title: 'exportDataWord', icon: <PiExportBold />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    const listButtonsData = [

        {
            id: 1,
            data: ['allTypesWord', ...new Set(tableData.data.map(report => report.reportType))],
            key: 'reportType'
        },

        {
            id: 2,
            data: ['allStatusWord', ...new Set(tableData.data.map(report => report.status))],
            key: 'status'
        },

    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        type: 'allTypesWord',
        status: 'allStatusWord'
    };

    const excludeValues = useMemo(() => ['allTypesWord', 'allStatusWord'], []);
    const searchKeys  = useMemo(() => ['complainant', 'artist'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        tableData.data, initialFilters, excludeValues, searchKeys
    );

    // ====== handle-view-Report-button ====== //

    const [openReportPopUp, setOpenReportPopUp] = useState(false);
    const [reportMessage, setReportMessage] = useState(null);

    const showReport = (msg) => {
        setOpenReportPopUp(true);
        setReportMessage(msg);
    }

    return <React.Fragment>

        <AnimatePresence>
            {openReportPopUp && <PopUp>
                <PopUpDescription title={'reportDescriptionWord'} msg={reportMessage} onClose={() => setOpenReportPopUp(false)} />
            </PopUp>}
        </AnimatePresence>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'reportsManageWord'} slogan={'reportsManagementPageSlogan'} buttons={usersButtons} />

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput 
                        id={'reportSearch'} placeholder={'reportSearchWord'} 
                        onSearch={(value) => setSearchText(value)}
                    />
                </div>

                <div className='flex flex-wrap items-center gap-2.5'>
                    {listButtonsData.map((list, idx) => (
                        <ListBtn 
                            key={idx} listData={list.data} filterKey={list.key} 
                            color={'var(--white-color)'} 
                            onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                        />
                    ))}
                </div>

            </div>

            <div className='w-full rounded-2xl bg-[var(--white-color)] overflow-hidden'>

                <Table data={filteredData}
                    columns={tableData.columns}
                    actions={true} 
                    renderRow={(report) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {Numbers(report.id, i18n.language)}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.complainant}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.artist}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.reportType}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {report.date.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).reverse().join(' - ')}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={() => showReport(report.description)}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--sky-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewReportWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </button>
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <ElementBox title={report.status} 
                                    bgColor={
                                        report.status === 'resolvedWord' ? 'var(--light-green-color)'
                                        : report.status === 'pendingWord' ? 'var(--light-yellow-color)'
                                        : report.status === 'reviewedWord' ? 'var(--sky-blue-color)'
                                        : 'var(--light-red-color)'
                                    } 
                                    color={
                                        report.status === 'resolvedWord' ? 'var(--green-color)'
                                        : report.status === 'pendingWord' ? 'var(--yellow-color)'
                                        : report.status === 'reviewedWord' ? 'var(--dark-blue-color)'
                                        : 'var(--red-color)'
                                    } 
                                />
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(order) => (
                        <React.Fragment>

                            <div className='w-full flex items-center justify-center gap-2.5'>

                                <button 
                                    // onClick={() => handleBanClick(user)}
                                    id={`banUser-${order.id}`}
                                    className='
                                            p-2.5 rounded-md bg-[var(--light-red-color)]
                                            text-[var(--red-color)] cursor-pointer duration-300
                                            hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                    '
                                >
                                    <IoBanSharp />
                                </button>

                            </div>

                        </React.Fragment>
                    )}
                />

            </div>

        </section>

    </React.Fragment>

}
