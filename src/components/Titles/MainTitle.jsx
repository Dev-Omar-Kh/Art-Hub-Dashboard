import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MainTitle({title, slogan, buttons}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex flex-wrap items-center justify-between gap-5'>

            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl font-bold text-[var(--dark-blue-color)]'>{t(title)}</h1>
                <p className='text-xl text-[var(--gray-color)]'>{t(slogan)}</p>
            </div>

            {buttons && <div className='flex flex-wrap items-center gap-2.5'>

                {buttons.map(btn => <button 
                    key={btn.id}
                    className={`
                        py-2.5 px-5 rounded-md  flex items-center gap-2.5 font-medium
                        border border-solid border-[var(--dark-blue-color)] cursor-pointer
                        ${btn.color === 'blue' 
                            ? 'bg-[var(--dark-blue-color)] text-[var(--white-color)]' 
                            : 'bg-[var(--white-color)] text-[var(--dark-blue-color)]'
                        }
                    `}
                >
                    {btn.icon && <span className='text-xl'>{btn.icon}</span>}
                    <p>{t(btn.title)}</p>
                </button>)}

            </div>}

        </div>

    </React.Fragment>

}
