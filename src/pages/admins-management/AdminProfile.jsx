import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoBanSharp, IoCalendarOutline } from 'react-icons/io5';
import MainTitle from '../../components/Titles/MainTitle';
import { ROUTES } from '../../constants/routes';
import PathSteps from '../../components/path-steps/PathSteps';

// ====== import-images ====== //

import userPfp from '../../assets/images/artist.jpg';
import { useTranslation } from 'react-i18next';
import Numbers from '../../services/convertNum';
import { MdOutlineMail } from 'react-icons/md';
import { TbMilitaryRank } from 'react-icons/tb';
import ElementBox from '../../components/elements-box/ElementBox';
import { GiRank3 } from 'react-icons/gi';

const profileButtons = [
    {id: 1, title: 'editDataWord', icon: <FiEdit />, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    {id: 2, title: 'banWord', icon: <IoBanSharp />, color: 'var(--red-color)', bgColor: 'var(--light-red-color)'},
];

const paths = [
    {id: 1, title: 'adminsManageWord', url: ROUTES.ADMINS_ROUTE},
    {id: 2, title: 'adminProfileWord'},
];

export default function AdminProfile() {

    const {i18n} = useTranslation();

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>
        
            <MainTitle title={'adminProfileWord'} slogan={'adminProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            <div 
                className='
                    w-full p-5 flex items-center gap-5 rounded-2xl bg-[var(--white-color)] 
                    shadow-[0_0px_10px_var(--shadow-black-color)] max-[695px]:flex-col max-[770px]:items-start
                '
            >

                <div className='w-52 h-52 overflow-hidden max-[430px]:w-36 max-[430px]:h-36 max-[430px]:m-auto'>
                    <img className='w-full h-full rounded-full object-cover' src={userPfp} alt={'data?.name'} />
                </div>

                <div className='flex flex-col gap-5'>

                    <h3 
                        className='
                            flex flex-wrap items-center gap-1 
                            text-2xl font-semibold text-[var(--dark-blue-color)]
                        '
                    >
                        {'عمر خالد محمد سعيد'}
                        <span className='text-base text-[var(--gray-color)]'> ({Numbers('144175147123', i18n.language, true)})</span>
                    </h3>

                    <div className='w-full flex flex-col gap-2.5'>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <MdOutlineMail className='text-xl text-[var(--dark-blue-color)]' />
                            <p>omar.2004@gmail.com</p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <IoCalendarOutline className='text-xl text-[var(--dark-blue-color)]' />
                            <p className='text-lg'>
                                {'15-1-2023'.split('-').map((item) => (
                                    Numbers(item, i18n.language, true)
                                )).join(' - ')}
                            </p>
                        </div>

                        <div className='flex items-center gap-2.5 font-medium text-[var(--gray-color)]'>
                            <GiRank3 className='text-xl text-[var(--dark-blue-color)]' />
                            <div>
                                <ElementBox 
                                    title={'superadminWord'}
                                    bgColor={'var(--mid-blue-color)'} color={'var(--dark-blue-color)'}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </section>

    </React.Fragment>

}
