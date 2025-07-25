import React from 'react'
import Lottie from 'lottie-react';
import errorIcon from '../../../assets/jsons/wrong.json';
import successIcon from '../../../assets/jsons/success.json';
import { useTranslation } from 'react-i18next';

export default function ResponseBox({type, msg, userName}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='flex flex-col items-center justify-center gap-2.5'>

            <Lottie className='w-32' animationData={type ? successIcon : errorIcon} loop={false} />

            <p 
                className={`
                    text-xl font-medium text-center max-[425px]:text-base 
                    ${type ? 'text-[var(--gray-color)]' : 'text-[var(--red-color)]'}
                `} 
            >{userName ? t(msg, {name: userName}) : t(msg)}</p>

        </div>

    </React.Fragment>

}
