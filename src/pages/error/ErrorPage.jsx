import React from 'react'
import Numbers from '../../services/convertNum'
import { useTranslation } from 'react-i18next'
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {

    const {t, i18n} = useTranslation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return <React.Fragment>

        <section className='w-full h-[100dvh] flex flex-col items-center justify-center'>

            <h3 className='text-[14rem] font-extrabold text-[var(--dark-blue-color)] line-hight-14'>
                {Numbers(4, i18n.language)}
                <span className='text-[var(--mid-blue-color)]'>{Numbers(0, i18n.language)}</span>
                {Numbers(4, i18n.language)}
            </h3>

            <div className='flex flex-col items-center gap-5'>
                <p className='text-2xl font-semibold text-[var(--gray-color)]'>{t('pageNoteFoundMsg')}</p>
                <button 
                    onClick={handleGoBack}
                    className='
                        w-fit px-5 py-2.5 flex items-center gap-2.5 rounded-md cursor-pointer
                        bg-[var(--mid-blue-color)] text-lg font-medium text-[var(--dark-blue-color)]
                    '
                >
                    <IoIosArrowForward />
                    {t('goBackWord')}
                </button>
            </div>

        </section>

    </React.Fragment>

}
