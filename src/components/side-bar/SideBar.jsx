import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CustomBtn from '../buttons/CustomBtn';
import { ROUTES } from '../../constants/routes';
import { RiLogoutCircleRLine, RiShoppingCartLine } from 'react-icons/ri';
import { GoHome } from 'react-icons/go';
import { LuChartColumn, LuListMinus, LuUsers } from 'react-icons/lu';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsFileEarmarkText } from 'react-icons/bs';
import { PiStarHalfFill } from 'react-icons/pi';
import { CgCloseO } from 'react-icons/cg';

// ====== import-images ====== //

import logo from '../../assets/images/logo.png';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

export default function SideBar({setDisplayNav}) {

    const links = [

        {icon: <GoHome/>, title: 'homeWord', path: ROUTES.HOME_ROUTE},
        {icon: <LuUsers/>, title: 'usersManageWord', path: ROUTES.USERS_ROUTE},
        {icon: <MdOutlineAdminPanelSettings/>, title: 'adminsManageWord', path: ROUTES.ADMINS_ROUTE},
        {icon: <RiShoppingCartLine/>, title: 'ordersWord', path: ROUTES.ORDERS_ROUTE},
        {icon: <LuChartColumn/>, title: 'salesAnalysisWord', path: ROUTES.SALES_ANALYSIS_ROUTE},
        {icon: <PiStarHalfFill/>, title: 'ratesWord', path: ROUTES.RATES_ROUTE},
        {icon: <BsFileEarmarkText/>, title: 'reportsWord', path: ROUTES.REPORTS_ROUTE},
        {icon: <IoSettingsOutline/>, title: 'settingSystemWord', path: ROUTES.SETTINGS_ROUTE},

    ];

    return <React.Fragment>

        <aside className='relative w-81 max-[980px]:w-full h-full flex flex-col gap-5 items-center justify-between p-5'>

            <div 
                className='
                        absolute start-full top-0 bg-[var(--white-color)] px-2 py-1 hidden max-[980px]:block
                        rounded-l-md shadow-[-3px_0px_10px_var(--light-dark-blue-color)]
                    '
                >
                <LuListMinus 
                    onClick={() => setDisplayNav(true)}
                    className='text-4xl text-[var(--dark-blue-color)] cursor-pointer' 
                />
            </div>

            <div className='w-full flex items-center justify-center max-[980px]:justify-between'>

                <img className='w-24' src={logo} alt='logo image' loading='lazy' />

                <CgCloseO
                    onClick={() => setDisplayNav(false)}
                    className='text-4xl text-[var(--dark-blue-color)] cursor-pointer hidden max-[980px]:block' 
                />

            </div>

            <nav className='w-full h-full py-0.5 px-2.5 overflow-y-auto overflow-x-hidden'>

                <ul className='w-full flex flex-col items-center gap-5'>

                    {links.map((link, idx) => (
                        <NavLink 
                            key={idx} to={link.path} onClick={() => setDisplayNav(false)}
                            className={({ isActive }) => `w-full ${isActive ? 'active' : ''}`}
                        >
                            {({isActive}) => (<li className='w-full'>
                                <CustomBtn icon={link.icon} title={link.title} hover={true} isActive={isActive} />
                            </li>)}
                        </NavLink>
                    ))}

                </ul>

            </nav>

            <div className='w-full px-2.5'>
                <button className='w-full' onClick={() => setDisplayNav(false)}>
                    <CustomBtn 
                        icon={<RiLogoutCircleRLine/>}
                        title={'logoutWord'} hover={true} color={'var(--light-red-color)'} 
                        hoverColor={'var(--mid-red-color)'} center={true}
                    />
                </button>
            </div>

        </aside>

    </React.Fragment>

}
