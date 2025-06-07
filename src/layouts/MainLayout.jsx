import React from 'react';
import { Outlet } from 'react-router-dom';

import sideBarBg from '../assets/images/sidebar-bg.png';

export default function MainLayout() {

    return <React.Fragment>

        <section className='w-full h-[100dvh] flex items-center bg-[var(--sky-blue-color)]'>

            <section className='w-80 h-full bg-no-repeat bg-cover' style={{backgroundImage: `url(${sideBarBg})`}}></section>

            <section className='content-width h-full'>

                <Outlet />

            </section>

        </section>

    </React.Fragment>

}
