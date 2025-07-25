import React from 'react';

// ====== import-images ====== //

import profileCover from '../../../../assets/images/cover-image.jpg';
import pfpImg from '../../../../assets/images/artist.jpg';
import ElementBox from '../../../../components/elements-box/ElementBox';
import { MdOutlineMail, MdOutlinePhoneEnabled } from 'react-icons/md';
import Numbers from '../../../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';

export default function ArtistData() {

    const {t, i18n} = useTranslation();

    const skillsData = [
        {id: 1, name: 'بورتريه'},
        {id: 2, name: 'فن معاصر'},
        {id: 3, name: 'ألوان مائية'},
        {id: 4, name: 'فن تجريدي'},
    ]

    return <React.Fragment>

        <div 
            className='
                w-full relative rounded-2xl bg-[var(--white-color)] 
                overflow-hidden pb-5
            '
        >

            <div className='relative w-full h-32'>

                <img 
                    src={pfpImg} alt={`profile image`}
                    className='
                        absolute start-5 -bottom-16 w-32 h-32 rounded-full 
                        object-cover border-4 border-[var(--white-color)]
                    ' 
                />

                <div 
                    className='
                        absolute start-7 -bottom-14 w-6 h-6 flex items-center justify-center 
                        border-2 border-[var(--white-color)] bg-[var(--green-color)] rounded-full
                    '
                >
                    <FaCheck className='text-[0.625rem] text-[var(--white-color)]' />
                </div>

                <img className='w-full h-full object-cover' src={profileCover} alt={`profile cover image`} />

                <div className='absolute top-5 end-5 z-20'>
                    <ElementBox shadow={true} title={'activeWord'} bgColor={'var(--light-green-color)'} color={'var(--green-color)'} />
                </div>

            </div>

            <div className='w-full mt-19 px-5 flex flex-col gap-2.5'>

                <div className='pt-0 flex flex-col gap-1'>

                    <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>
                        عمر خالد محمد
                        <span className='text-base font-medium text-[var(--gray-color)]'> (ART-2024-001)</span>
                    </h3>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                        <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                        <p>omar.2004@gmail.com</p>
                    </div>

                    <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                        <MdOutlinePhoneEnabled className='text-xl text-[var(--dark-blue-color)]' />
                        <p className='text-lg'>{Numbers('201140067845', i18n.language, true)}+</p>
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

                <div className='w-full h-0.25 bg-[var(--mid-light-gray-color)] rounded-4xl'></div>

                <div className='w-full flex flex-col gap-1.5'>
                    <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('aboutArtist')}</h3>
                    <p className='text-base text-[var(--gray-color)]'>
                        فنانة معاصرة متخصصة في الفن التجريدي والرسم بالألوان المائية. تتميز أعمالها بالتعبير العميق عن المشاعر الإنسانية من خلال الألوان والأشكال. حاصلة على درجة الماجستير في الفنون الجميلة من جامعة الملك سعود، وشاركت في أكثر من 15 معرضاً فنياً محلياً ودولياً.
                    </p>
                </div>

                <div className='w-full h-0.25 bg-[var(--mid-light-gray-color)] rounded-4xl'></div>

                <div className='w-full flex flex-wrap items-center gap-2.5'>

                    {skillsData.map(item => <div key={item.id}>
                        <ElementBox 
                            title={item.name} 
                            bgColor={'var(--mid-blue-color)'} color={'var(--dark-blue-color)'} 
                        />
                    </div>)}

                </div>

            </div>

        </div>

    </React.Fragment>

}
