import React, { useCallback, useEffect, useRef, useState } from 'react';
import Animations from '../../animations/Animations';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export default function SelectBtn({icon, title, options, handleClick, disabled = false}) {

    const {t} = useTranslation();

    const listRef = useRef(null);
    const [displayOptions, setDisplayOptions] = useState(false);

    // ====== handle-list-button ====== //

    const handleClickOutside = useCallback((event) => {
    
        if (listRef.current && !listRef.current.contains(event.target)) {
            setDisplayOptions(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== handle-select-option ====== //

    const selectOption = (value) => {
        handleClick(value);
        setDisplayOptions(false);
    }

    return <React.Fragment>

        <div ref={listRef} className='relative'>

            <button 
                disabled={disabled}
                onClick={() => setDisplayOptions(!displayOptions)}
                className={`
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--dark-blue-color)]
                    text-xl font-medium text-[var(--white-color)]
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                {icon}
                <p className='text-base'>{t(title)}</p>
                <IoIosArrowBack className={`duration-300 ${displayOptions ? '-rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
                {displayOptions && <motion.div
                    variants={Animations.displayList}
                    initial='hidden' animate='visible' exit={'exit'}
                    className='
                        absolute list-top start-0 w-full max-h-80 overflow-hidden rounded-md 
                        shadow-[0_0px_10px_var(--shadow-black-color)] bg-[var(--white-color)] 
                        border border-solid border-[var(--sky-blue-color)] z-20
                    '
                >

                    <ul className='w-full max-h-80 rounded-md overflow-auto'>

                        {options.map( (item, idx) => <li 
                            key={idx}
                            onClick={() => selectOption(item.value)}
                            className={`
                                w-full p-2.5 border-b border-solid border-[var(--sky-blue-color)] last:border-0 font-medium
                                text-[var(--dark-blue-color)] text-center duration-300 hover:bg-[var(--sky-blue-color)] cursor-pointer
                            `}
                        >{t(item.label)}</li>)}

                    </ul>

                </motion.div>}
            </AnimatePresence>

        </div>

    </React.Fragment>

}
