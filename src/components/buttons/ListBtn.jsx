import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowBack } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../animations/Animations';

export default function ListBtn({listData, color='var(--sky-blue-color)', filterKey, onFilterChange}) {

    const {t} = useTranslation();

    const [displayList, setDisplayList] = useState(false);
    const [chosenItem, setChosenItem] = useState(listData[0]);
    const listRef = useRef(null);

    // ====== handle-click-outside-list ====== //

    const handleClickOutside = useCallback((event) => {

        if (listRef.current && !listRef.current.contains(event.target)) {
            setDisplayList(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== handle-change-item ====== //

    const choseItem = (item) => {
        onFilterChange(filterKey, item.value);
        setChosenItem(item);
        setDisplayList(false);
    };

    return <React.Fragment>

        <div ref={listRef} className='relative'>

            <button 
                onClick={() => setDisplayList(!displayList)}
                style={{backgroundColor: color}}
                className='
                    w-fit px-3 py-2.5 flex items-center gap-2.5 rounded-md 
                    text-[var(--dark-blue-color)] cursor-pointer
                '
            >

                <p className='text-base font-semibold '>{t(chosenItem.label)}</p>

                <IoIosArrowBack className={`text-xl duration-300 ${displayList ? '-rotate-90' : ''}`} />

            </button>

            <AnimatePresence>
                {displayList && <motion.div 
                    variants={Animations.displayList}
                    initial='hidden' animate='visible' exit={'exit'}
                    className='
                        absolute list-top start-0 w-full max-h-80 overflow-hidden rounded-md 
                        shadow-[0_0px_10px_var(--shadow-black-color)] bg-[var(--white-color)] 
                        border border-solid border-[var(--sky-blue-color)] z-20
                    '
                >

                    <ul className='w-full max-h-80 rounded-md overflow-auto'>

                        {listData.map( (item, idx) => <li 
                            key={idx}
                            onClick={() => choseItem(item)}
                            className={`
                                w-full p-2.5 border-b border-solid border-[var(--sky-blue-color)] last:border-0 font-medium
                                text-[var(--dark-blue-color)] text-center duration-300 hover:bg-[var(--sky-blue-color)] cursor-pointer
                                ${chosenItem.value === item.value ? 'bg-[var(--sky-blue-color)]' : 'bg-[var(--white-color)]'}
                            `}
                        >{t(item.label)}</li>)}

                    </ul>

                </motion.div>}
            </AnimatePresence>

        </div>

    </React.Fragment>

}
