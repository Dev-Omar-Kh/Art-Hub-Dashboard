import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import sideBarBg from '../assets/images/sidebar-bg.png';
import SideBar from '../components/side-bar/SideBar';

export default function MainLayout() {

    const [displayNav, setDisplayNav] = useState(false);

    return <React.Fragment>

        <section className='w-full h-[100dvh] flex items-center bg-[var(--sky-blue-color)]'>

            <section 
                className={`
                    w-96 h-full bg-no-repeat bg-cover max-[980px]:bg-[var(--white-color)] 
                    max-[980px]:fixed max-[980px]:w-full max-[980px]:z-50 duration-300
                    ${!displayNav ? 'max-[980px]:translate-x-full' : 'max-[980px]:translate-x-0'}
                `}
                style={{backgroundImage: `url(${sideBarBg})`}}
            >

                <SideBar setDisplayNav={setDisplayNav} />

            </section>

            <main className='content-width main-p h-full overflow-auto'>

                <Outlet />

            </main>

        </section>

    </React.Fragment>

}
