import React from 'react'
import { useTranslation } from 'react-i18next'

export default function CheckBox({id, title, label}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <label 
            htmlFor={id} 
            className='w-full p-5 flex items-center justify-between gap-5 rounded-md bg-[var(--light-gray-color)] cursor-pointer'
        >

            <div className='flex flex-col gap-1.5'>

                <h3 className='text-xl font-medium text-[var(--dark-blue-color)]'>{t(title)}</h3>

                <p className='text-base text-[var(--gray-color)]'>{t(label)}</p>

            </div>

            <div className="relative inline-flex items-center cursor-pointer">
                <input id={id} type="checkbox" defaultValue className="sr-only peer" />
                <div 
                    className={`
                        group peer ring-0 bg-[var(--gray-color)] rounded-full outline-none text-[0.625rem]
                        duration-300 after:duration-300 w-12 h-6 shadow-md peer-checked:bg-[var(--green-color)]
                        peer-focus:outline-none after:rounded-full after:absolute after:bg-[var(--white-color)] 
                        after:outline-none after:h-5 after:w-5 after:top-0.5 after:start-0.5 after:-rotate-180 
                        after:flex after:justify-center after:items-center peer-hover:after:scale-95 peer-checked:after:rotate-0
                        ${i18n.language === 'en' ? 'peer-checked:after:translate-x-6 ' : 'peer-checked:after:-translate-x-6 '}
                    `}
                ></div>
            </div>

        </label>

    </React.Fragment>

}
