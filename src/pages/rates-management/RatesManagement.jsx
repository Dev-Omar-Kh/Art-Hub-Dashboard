import React, { useMemo, useState } from 'react'
import MainTitle from '../../components/Titles/MainTitle'
import { useTranslation } from 'react-i18next';
import { PiExportBold, PiWarningOctagonBold } from 'react-icons/pi';
import Table from '../../components/table/Table';
import Numbers from '../../services/convertNum';
import { GoStarFill } from 'react-icons/go';
import { IoIosArrowForward } from 'react-icons/io';
import { IoBanSharp } from 'react-icons/io5';
import { useFilterAndSearch } from '../../hooks/useFilterAndSearch';
import ListBtn from '../../components/buttons/ListBtn';
import PopUp from '../../components/pop-up/PopUp';
import { AnimatePresence } from 'framer-motion';
import PopUpDescription from '../../components/pop-up/pop-up-box/PopUpDescription';
import WarningBox from './../../components/pop-up/warning-box/WarningBox';
import SearchInput from './../../components/inputs/search-input/SearchInput';

const tableData = {

    columns: ['#', 'nameWord', 'clientWord', 'artistWord', 'rateWord', 'dateWord', 'commentWord', 'actionsWord'],

    data: [

        {
            id: 1,
            title: 'لوحة زيتية مخصصة',
            client: 'منى سالم',
            artist: 'احمد محمد',
            rate: 4,
            comment: 'عمل رائع جدًا ويستحق التقدير.',
            date: '18-1-2025'
        },

        {
            id: 2,
            title: 'لوحة مائية حديثة',
            client: 'ياسر فؤاد',
            artist: 'عمر خالد',
            rate: 3.5,
            comment: 'العمل جيد، لكن هناك مجال للتحسين.',
            date: '10-11-2024'
        },

        {
            id: 3,
            title: 'رسم بالفحم لمنظر طبيعي',
            client: 'هدى إبراهيم',
            artist: 'ليلى علي',
            rate: 5,
            comment: 'تحفة فنية بكل المقاييس!',
            date: '5-2-2025'
        },

        {
            id: 4,
            title: 'بورتريه كلاسيكي',
            client: 'زياد محسن',
            artist: 'سارة محمود',
            rate: 4.5,
            comment: 'عمل ممتاز واحترافي جدًا.',
            date: '22-3-2025'
        },

        {
            id: 5,
            title: 'لوحة تجريدية ملونة',
            client: 'ريهام عبد الله',
            artist: 'محمود حسن',
            rate: 4,
            comment: 'ألوان مبهجة وتناسق جميل.',
            date: '17-4-2025'
        },

        {
            id: 6,
            title: 'رسم رقمي لمدينة',
            client: 'عماد مصطفى',
            artist: 'نورا إبراهيم',
            rate: 3,
            comment: 'التفاصيل كانت تحتاج المزيد من العناية.',
            date: '9-5-2025'
        },

        {
            id: 7,
            title: 'منظر بحري هادئ',
            client: 'مروان خليل',
            artist: 'كريم مصطفى',
            rate: 4.2,
            comment: 'الرسم مريح للعين وجميل.',
            date: '1-6-2025'
        },

        {
            id: 8,
            title: 'لوحة بانورامية للصحراء',
            client: 'شهد مجدي',
            artist: 'هدى عصام',
            rate: 4.8,
            comment: 'إبداع في التفاصيل والألوان.',
            date: '12-6-2025'
        },

        {
            id: 9,
            title: 'لوحة بألوان الباستيل',
            client: 'نهى طارق',
            artist: 'ياسر أحمد',
            rate: 3.7,
            comment: 'الألوان ناعمة ولكن التكوين بسيط.',
            date: '28-6-2025'
        },

        {
            id: 10,
            title: 'رسم تعبيري بالحبر',
            client: 'سليم حسن',
            artist: 'أميرة سامي',
            rate: 4.6,
            comment: 'فكرة جديدة وتنفيذ رائع.',
            date: '5-7-2025'
        },

        {
            id: 11,
            title: 'لوحة بورتريه عصري',
            client: 'أحمد يونس',
            artist: 'حسن علاء',
            rate: 2.8,
            comment: 'لم تكن كما توقعت.',
            date: '19-7-2025'
        },

        {
            id: 12,
            title: 'منظر جبلي هادئ',
            client: 'مها جمال',
            artist: 'نجلاء عبد الحليم',
            rate: 5,
            comment: 'خرافية وتفوق التوقعات!',
            date: '30-7-2025'
        },

        {
            id: 13,
            title: 'لوحة خيالية ساحرة',
            client: 'فاطمة حسين',
            artist: 'رامي السيد',
            rate: 4.4,
            comment: 'الخيال واضح والنتيجة مبهرة.',
            date: '9-8-2025'
        },

        {
            id: 14,
            title: 'فن تجريدي بالأسود والأبيض',
            client: 'ليلى سمير',
            artist: 'إيمان خالد',
            rate: 3.9,
            comment: 'فكرة جريئة وتنفيذ جيد.',
            date: '23-8-2025'
        },

        {
            id: 15,
            title: 'لوحة رومانسية بألوان دافئة',
            client: 'سارة شكري',
            artist: 'طارق عبد الله',
            rate: 4.3,
            comment: 'جميلة جدًا وألوانها مريحة.',
            date: '2-9-2025'
        },

        {
            id: 16,
            title: 'منظر طبيعي نهاري',
            client: 'علي ربيع',
            artist: 'مها عماد',
            rate: 4.7,
            comment: 'تشعر وكأنك في اللوحة نفسها!',
            date: '13-9-2025'
        },

        {
            id: 17,
            title: 'لوحة ألوان زيتية مكثفة',
            client: 'هبة فؤاد',
            artist: 'مصطفى حسن',
            rate: 3.6,
            comment: 'الألوان قوية لكن بعض التفاصيل غير دقيقة.',
            date: '20-9-2025'
        },

        {
            id: 18,
            title: 'رسم تعبيري عن الغروب',
            client: 'طارق لطفي',
            artist: 'إيناس يوسف',
            rate: 4.9,
            comment: 'أكثر من رائع! أعاد لي ذكريات جميلة.',
            date: '27-9-2025'
        },

        {
            id: 19,
            title: 'تصميم تجريدي بالديجيتال',
            client: 'داليا شوقي',
            artist: 'حسن سليمان',
            rate: 3.3,
            comment: 'الفكرة مبتكرة لكن الإخراج كان يمكن أن يكون أفضل.',
            date: '5-10-2025'
        }

    ]

}

export default function RatesManagement() {

    const {t, i18n} = useTranslation();

    // ====== buttons-data ====== //

    const usersButtons = [
        {id: 2, title: 'exportDataWord', icon: <PiExportBold />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    const listButtonsData = [
        {
            id: 1,
            data: [
                {value: 'allRatesWord', label: 'allRatesWord'}, 
                {value: '5StarWord', label: '5StarWord'}, 
                {value: '4StarWord', label: '4StarWord'}, 
                {value: 'lessThan4StarWord', label: 'lessThan4StarWord'}
            ],
            key: 'rate'
        },
    ];

    // ====== handle-filter-&-search-data ====== //

    const initialFilters = {
        rate: 'allRatesWord',
    };

    const excludeValues = useMemo(() => ['allRatesWord'], []);
    const searchKeys  = useMemo(() => ['title'], []);
    const {filteredData, setFilters, setSearchText} = useFilterAndSearch(
        tableData.data, initialFilters, excludeValues, searchKeys
    );

    // ====== handle-view-comment-button ====== //

    const [openCommentPopUp, setOpenCommentPopUp] = useState(false);
    const [rateMessage, setRateMessage] = useState(null);

    const showComment = (msg) => {
        setOpenCommentPopUp(true);
        setRateMessage(msg);
    }

    // ====== handle-delete-row ====== //

    const [isOpen, setIsOpen] = useState(false);

    const handleDeleteRow = () => {
        setIsOpen(true);
    }

    return <React.Fragment>

        <AnimatePresence>
            {openCommentPopUp && <PopUp onClose={() => setOpenCommentPopUp(false)}>
                <PopUpDescription title={'commentWord'} msg={rateMessage} onClose={() => setOpenCommentPopUp(false)} />
            </PopUp>}

            {isOpen && <PopUp onClose={() => setIsOpen(false)}>
                <WarningBox 
                    icon={<PiWarningOctagonBold />} 
                    title={'deleteRateTitle'} msg={'deleteRateMsg'} 
                    onClose={() => setIsOpen(false)}
                />
            </PopUp>}

        </AnimatePresence>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'ratesManageWord'} slogan={'ratesManagementPageSlogan'} buttons={usersButtons} />

            <div className='w-full flex flex-wrap gap-5 items-center justify-between'>

                <div className='w-sm'>
                    <SearchInput 
                        id={'orderSearch'} placeholder={'orderSearchWord'} 
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
                    renderRow={(rate) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>
                                {Numbers(rate.id, i18n.language)}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.title}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.client}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.artist}
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                <div className='w-full flex items-center justify-center gap-1'>
                                    <p className='font-semibold'>{Numbers(rate.rate, i18n.language)}</p>
                                    <GoStarFill className='text-sm text-[var(--yellow-color)]' />
                                </div>
                            </td>

                            <td 
                                className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}
                            >
                                {rate.date.split('-').map((item) => (
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
                                        onClick={() => showComment(rate.comment)}
                                        className='
                                            px-2 py-1 flex items-center justify-center gap-1 cursor-pointer 
                                            text-[var(--dark-blue-color)] bg-[var(--sky-blue-color)] rounded-md
                                        '
                                    >
                                        <p>{t('viewCommentWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </button>
                                </div>
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(rate) => (
                        <React.Fragment>

                            <div className='w-full flex items-center justify-center gap-2.5'>

                                <button 
                                    onClick={() => handleDeleteRow(rate)}
                                    id={`banUser-${rate.id}`}
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
