import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';

export default function MainTitle({title, slogan, buttons, haveBorder = false}) {

    const {t} = useTranslation();

    const btnStyle = (btn) => {
        return {backgroundColor: btn.bgColor, color: btn.color}
    };

    const btnClassName = `
        py-2.5 px-5 rounded-md  flex items-center gap-2.5 font-medium cursor-pointer
        ${haveBorder ? 'border border-[var(--dark-blue-color)]' : ''}
    `;

    const btnContent = (btn) => <React.Fragment>

            {btn.icon && <span className='text-xl'>{btn.icon}</span>}
            <p>{t(btn.title)}</p>

    </React.Fragment>

    return <React.Fragment>

        <div className='w-full flex flex-wrap items-center justify-between gap-5'>

            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold text-[var(--dark-blue-color)]'>{t(title)}</h1>
                <p className='text-xl text-[var(--gray-color)]'>{t(slogan)}</p>
            </div>

            {buttons && <div className='flex flex-wrap items-center gap-2.5'>

                {buttons.map(btn => (
                    btn.url 
                    ? <Link to={btn.url} key={btn.id} className={btnClassName} style={btnStyle(btn)}>
                        {btnContent(btn)}
                    </Link>
                    : <button key={btn.id} className={btnClassName} style={btnStyle(btn)} onClick={btn.onClick}>
                        {btnContent(btn)}
                    </button>
                ))}

            </div>}

        </div>

    </React.Fragment>

}
