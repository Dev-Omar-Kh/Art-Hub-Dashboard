import React from 'react';
import { useTranslation } from 'react-i18next';
import errorSVG from '../../assets/jsons/wrong.json';
import Lottie from 'lottie-react';

export default function FetchError({className = ''}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div 
            className={`
                ${className} p-5 rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] flex flex-col items-center justify-center
            `}
        >

            <Lottie className='w-28' animationData={errorSVG} loop={false} />
            <p className='text-xl font-semibold text-[var(--red-color)]'>{t('errorFetchMessage')}</p>

        </div>

    </React.Fragment>

}
