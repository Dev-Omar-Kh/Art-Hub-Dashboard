import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FormBtn({title, width = 'w-full'}) {

    const { t } = useTranslation();

    return <React.Fragment>

        <button 
            type='submit'
            className={`
                ${width} rounded-4xl p-2.5 bg-[var(--sky-blue-color)] 
                text-[var(--gray-color)] text-base font-semibold cursor-pointer
                duration-300 hover:text-[var(--dark-blue-color)] hover:bg-[var(--mid-blue-color)]
            `}
        >
            {t(title)}
        </button>

    </React.Fragment>

}
