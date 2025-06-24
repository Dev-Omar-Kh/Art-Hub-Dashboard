import React from 'react';

// ====== import-images ====== //

import clientImg from '../../../../assets/images/artist.jpg';
import { MdOutlineMail, MdOutlinePhoneEnabled } from 'react-icons/md';
import Numbers from '../../../../services/convertNum';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

export default function ClientData({achData}) {

    const { t, i18n } = useTranslation();

    return <React.Fragment>

        <div className='w-full grid grid-cols-5 gap-5 max-[735px]:grid-cols-1'>

            <div className='flex flex-col  gap-2.5 rounded-2xl bg-[var(--white-color)] p-5 col-span-2 max-[735px]:col-span-1'>

                <img 
                    src={clientImg} alt={`client image`} 
                    className='w-20 h-20 rounded-full object-cover border-3 border-[var(--dark-blue-color)]' 
                />

                <div className='flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>عمر خالد محمد</h3>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--dark-blue-color)]'>
                        <MdOutlineMail className='text-xl' />
                        <p>omar.2004@gmail.com</p>
                    </div>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--dark-blue-color)]'>
                        <MdOutlinePhoneEnabled className='text-xl' />
                        <p className='text-lg'>{Numbers('201140067845', i18n.language, true)} +</p>
                    </div>

                    <div className='flex flex-wrap gap-2.5'>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--dark-blue-color)]'>
                            <IoCalendarOutline className='text-xl' />
                            <p className='text-lg'>
                                {'15-1-2023'.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--dark-blue-color)]'>
                            <IoLocationOutline className='text-xl' />
                            <p>القاهرة, مصر</p>
                        </div>

                    </div>

                </div>

            </div>

            <div 
                className='
                    grid grid-cols-2 gap-2.5 rounded-2xl max-[735px]:col-span-1
                    bg-[var(--white-color)] p-5 col-span-3 max-[480px]:grid-cols-1
                '
            >

                {achData.map((item) => (
                    <div 
                        key={item.id}
                        className='p-2.5 flex flex-col items-center justify-center rounded-md bg-[var(--light-gray-color)]'
                    >
                        <div className='flex items-center justify-center gap-1 text-3xl font-semibold text-[var(--dark-blue-color)]'>
                            <p>{Numbers(item.value, i18n.language)}</p>
                            {item.icon && <span style={{color: item.iconColor}} className='text-xl'>{item.icon}</span>}
                            {item.isMoney && '$'}
                        </div>
                        <h3 className='text-lg text-center font-medium text-[var(--gray-color)]'>{t(item.title)}</h3>
                    </div>
                ))}

            </div>

        </div>

    </React.Fragment>

}
