import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5';
import FormBtn from '../../buttons/FormBtn';
import { PiWarningOctagonBold } from 'react-icons/pi';

export default function WarningBox({title, onClose, msg, icon, iconColor = 'var(--red-color)'}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='flex flex-col gap-5'>

            <div className="flex items-center justify-between">

                <div className='flex items-center gap-1.5 text-3xl' style={{color: iconColor}}>
                    {icon && icon}
                    <h3 className="text-2xl font-semibold text-[var(--dark-blue-color)]">{t(title)}</h3>
                </div>

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

            <p className='text-base font-medium text-[var(--gray-color)]'>{t(msg)}</p>

            <div className='w-full h-[0.0625rem] bg-[var(--sky-blue-color)] rounded-4xl'></div>

            <div className='col-span-2 flex items-center justify-end gap-2.5'>

                <FormBtn title={'cancelWord'} 
                    width={'fit'} bgColor={'var(--gray-color)'} type={'button'}
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                />

                <FormBtn title={'confirmWord'} 
                    width={'fit'} bgColor={'var(--red-color)'} type={'button'}
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                />

            </div>

        </div>

    </React.Fragment>

}
