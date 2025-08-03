import React from 'react';
import ElementBox from '../../../../components/elements-box/ElementBox';
import { MdOutlineMail } from 'react-icons/md';
import Numbers from '../../../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import LoadingRow from './../../../../components/loading-row/LoadingRow';
import FetchError from './../../../../components/error/FetchError';

export default function ArtistData({data, isLoading, isError}) {

    const {t, i18n} = useTranslation();

    const skillsData = [
        {id: 1, name: 'بورتريه'},
        {id: 2, name: 'فن معاصر'},
        {id: 3, name: 'ألوان مائية'},
        {id: 4, name: 'فن تجريدي'},
    ];

    const ArtistData = data?.data?.artist;

    if(isError) return <FetchError className='w-full h-fit' />

    return <React.Fragment>

        <div 
            className='
                w-full relative rounded-2xl bg-[var(--white-color)] 
                overflow-hidden pb-5
            '
        >

            {isLoading && <React.Fragment>

                <div className='relative w-full h-32'>

                    <div 
                        className='
                            absolute start-5 -bottom-16 w-34 h-34 flex items-center justify-center
                            rounded-full bg-[var(--white-color)] z-10
                        '
                    >
                        <LoadingRow className='w-32 h-32 rounded-full' />
                    </div>

                    <div className='w-full h-full'>
                        <LoadingRow className='w-full h-full rounded-0' />
                    </div>

                    <div className='absolute top-5 end-5 z-20'>
                        <LoadingRow className='w-16 h-8 rounded-0 rounded-4xl' />
                    </div>

                </div>

                <div className='w-full mt-19 px-5 flex flex-col gap-2.5'>

                    <div className='w-full pt-0 flex flex-col gap-2.5'>

                        <LoadingRow className='w-1/3 h-8 rounded-4xl' />

                        <LoadingRow className='w-1/4 h-5 rounded-4xl' />

                        <LoadingRow className='w-1/2 h-5 rounded-4xl' />

                    </div>

                    <div className='w-full h-0.25 bg-[var(--mid-light-gray-color)] rounded-4xl'></div>

                    <div className='w-full flex flex-col gap-2.5'>
                        <LoadingRow className='w-1/3 h-8 rounded-4xl' />
                        <div className='flex flex-col gap-1'>
                            <LoadingRow className='w-full h-4 rounded-4xl' />
                            <LoadingRow className='w-5/6 h-4 rounded-4xl' />
                        </div>
                    </div>

                    <div className='w-full h-0.25 bg-[var(--mid-light-gray-color)] rounded-4xl'></div>

                    <div className='w-full flex flex-wrap items-center gap-2.5'>

                        {Array.from({length: 4}).map((_, idx) => <LoadingRow key={idx} className='w-16 h-8   rounded-4xl' />)}

                    </div>

                </div>

            </React.Fragment>}

            {data && <React.Fragment>

                <div className='relative w-full h-32'>

                    <img id={ArtistData?._id}
                        src={ArtistData?.profileImage} alt={`${ArtistData?.displayName} profile image`}
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

                    <div className='w-full h-full bg-[var(--mid-gray-color)]'>
                        {ArtistData?.coverImage && <img 
                            className='w-full h-full object-cover' 
                            src={ArtistData.coverImage} alt={`profile cover image`} 
                        />}
                    </div>

                    <div className='absolute top-5 end-5 z-20'>
                        <ElementBox 
                            shadow={true} title={ArtistData?.isActive ? 'activeWord' : 'inactiveWord'} 
                            bgColor={ArtistData?.isActive ? 'var(--light-green-color)' : 'var(--light-red-color)'} 
                            color={ArtistData?.isActive ? 'var(--green-color)' : 'var(--red-color)'} 
                        />
                    </div>

                </div>

                <div className='w-full mt-19 px-5 flex flex-col gap-2.5'>

                    <div className='pt-0 flex flex-col gap-1'>

                        <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)] flex items-center gap-1'>
                            {ArtistData?.displayName}
                            <span className='text-base font-medium text-[var(--gray-color)]'> ({ArtistData?._id})</span>
                        </h3>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                            <p>{ArtistData?.email}</p>
                        </div>

                        <div className='flex flex-wrap gap-2.5'>

                            <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                                <IoCalendarOutline className='text-xl text-[var(--dark-blue-color)]' />
                                <p className='text-lg'>
                                    {ArtistData?.joinDate.split('T')[0].split('-').map((item) => (
                                        Numbers(item, i18n.language, true)
                                    )).join(' - ')}
                                </p>
                            </div>

                            <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                                <IoLocationOutline className='text-xl text-[var(--dark-blue-color)]' />
                                <p>الرياض, السعودية</p>
                            </div>

                        </div>

                    </div>

                    <div className='w-full h-0.25 bg-[var(--mid-light-gray-color)] rounded-4xl'></div>

                    <div className='w-full flex flex-col gap-1.5'>
                        <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t('aboutArtist')}</h3>
                        <p className='text-base text-[var(--gray-color)]'>
                            {ArtistData?.bio || t('notFoundWord')}
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

            </React.Fragment>}

        </div>

    </React.Fragment>

}
