import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

export default function TabNavigation({linksData}) {

    const {t, i18n} = useTranslation();
    const isAr = i18n.language === 'ar';

    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, start: 0 });
    const navRef = useRef(null);
    const location = useLocation();
    const activeLinkRef = useRef(null);

    const updateIndicator = useCallback((linkElement) => {

        if (!linkElement || !navRef.current) return;
        const navWidth = navRef.current.offsetWidth;
    
        const offset = isAr
            ? navWidth - (linkElement.offsetLeft + linkElement.offsetWidth)
            : linkElement.offsetLeft;
    
        setIndicatorStyle({
            width: linkElement.offsetWidth,
            start: offset
        });

    }, [isAr]);

    useEffect(() => {

        if (activeLinkRef.current) {
            updateIndicator(activeLinkRef.current);
        }

    }, [location.pathname, isAr, updateIndicator]);


    return <React.Fragment>

        <nav 
            id='ScrollTop'
            ref={navRef} 
            className='relative w-full overflow-x-auto overflow-y-hidden hidden-scroll border-b border-[var(--mid-gray-color)]'
        >

            <div id='indicator'
                className='absolute -bottom-0.25 h-0.75 bg-[var(--dark-blue-color)] transition-all duration-300 ease-in-out z-20'
                style={{
                    width: `${indicatorStyle.width}px`,
                    [isAr ? 'right' : 'left']: `${indicatorStyle.start}px`,
                    opacity: indicatorStyle.width > 0 ? 1 : 0
                }}
            />

            <ul className='w-full flex items-center gap-2.5'>

                {linksData.map(link => <li key={link.id}>
                    <NavLink
                        to={link.to} end
                        className={({ isActive }) => {
                            return `
                            p-2.5 text-lg font-bold duration-300 whitespace-nowrap inline-block 
                            ${isActive
                                ? 'text-[var(--dark-blue-color)]'
                                : 'text-[var(--mid-gray-color)] hover:text-[var(--dark-blue-color)]'}
                            `;
                        }}
                        ref={(el) => {
                            if (el && location.pathname.endsWith(link.to)) {
                            activeLinkRef.current = el;
                            }
                        }}
                    >
                        {t(link.title)}
                    </NavLink>
                </li>)}

            </ul>

        </nav>

    </React.Fragment>

}
