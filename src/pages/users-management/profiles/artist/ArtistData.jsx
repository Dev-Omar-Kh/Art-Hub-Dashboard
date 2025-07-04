import React from 'react';

// ====== import-images ====== //

import profileCover from '../../../../assets/images/cover-image.jpg';
import pfpImg from '../../../../assets/images/artist.jpg';
import ElementBox from '../../../../components/elements-box/ElementBox';
import { MdOutlineMail, MdOutlinePhoneEnabled } from 'react-icons/md';
import Numbers from '../../../../services/convertNum';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';

export default function ArtistData() {

    const {i18n} = useTranslation();

    return <React.Fragment>

        <div className='w-full grid grid-cols-1 gap-5 max-[735px]:grid-cols-1'>

            <div 
                className='
                    relative flex flex-col gap-2.5 rounded-2xl bg-[var(--white-color)] 
                    overflow-hidden col-span-2 max-[735px]:col-span-1
                '
            >

                <div className='absolute top-5 end-5 z-20'>
                    <ElementBox title={'activeWord'} bgColor={'var(--light-green-color)'} color={'var(--green-color)'} />
                </div>

                <div className='relative w-full h-32'>
                    <img 
                        src={pfpImg} alt={`profile image`}
                        className='
                            absolute start-5 -bottom-10 w-20 h-20 rounded-full 
                            object-cover border-4 border-[var(--white-color)]
                        ' 
                    />
                    <img className='w-full h-full object-cover' src={profileCover} alt={`profile cover image`} />
                </div>

                <div className='mt-8 p-5 pt-0 flex flex-col gap-1'>

                    <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>عمر خالد محمد</h3>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                        <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                        <p>omar.2004@gmail.com</p>
                    </div>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                        <MdOutlinePhoneEnabled className='text-xl text-[var(--dark-blue-color)]' />
                        <p className='text-lg'>{Numbers('201140067845', i18n.language, true)} +</p>
                    </div>

                    <div className='flex flex-wrap gap-2.5'>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoCalendarOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p className='text-lg'>
                                {'15-1-2023'.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoLocationOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p>القاهرة, مصر</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
