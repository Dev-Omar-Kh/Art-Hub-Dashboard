import React from 'react'
import { useTranslation } from 'react-i18next';

export default function FormBtn({icon, title, type = 'submit', width = 'w-full', color, bgColor, rounded, onClick, disabled}) {

    const { t } = useTranslation();

    return <React.Fragment>

        <button 
            {...(type === 'button' && onClick ? { onClick } : {}) }
            disabled={disabled}
            type={type}
            style={{color: color, backgroundColor: bgColor}}
            className={`
                ${width} ${rounded} flex items-center justify-center gap-1 py-2.5 px-5 
                text-base font-semibold cursor-pointer duration-300 
                hover:text-[var(--dark-blue-color)] hover:bg-[var(--mid-blue-color)]
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {icon && icon}
            <p>{t(title)}</p>
        </button>

    </React.Fragment>

}
