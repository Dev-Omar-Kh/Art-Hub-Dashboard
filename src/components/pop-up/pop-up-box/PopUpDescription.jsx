import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';

export default function PopUpDescription({title, onClose, msg}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='flex flex-col gap-5'>

            <div className="flex items-center justify-between">

                <h3 className="text-2xl font-semibold text-[var(--dark-blue-color)]">{t(title)}</h3>

                <button
                    onClick={onClose}
                    className="
                        p-1 bg-[var(--sky-blue-color)] 
                        rounded-full w-8 h-8 flex items-center justify-center text-[var(--dark-blue-color)] cursor-pointer
                        duration-300 hover:bg-[var(--mid-blue-color)]
                    "
                >
                    <IoClose className="text-xl" />
                </button>

            </div>

            <div className='w-full h-[0.0625rem] bg-[var(--sky-blue-color)] rounded-4xl'></div>

            <p className="text-base font-medium text-[var(--gray-color)]">{t(msg)}</p>

        </div>

    </React.Fragment>

}
