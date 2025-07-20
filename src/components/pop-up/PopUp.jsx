import React, { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';
import Animations from '../../animations/Animations';

export default function PopUp({children, onClose}) {

    // ====== handle-click-outside-list ====== //

    const boxRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (boxRef.current && !boxRef.current.contains(event.target)) {
            onClose();
        }

    }, [onClose]);

    useEffect(() => {

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [handleClickOutside]);

    return <React.Fragment>

        <motion.section
            variants={Animations.parentVariants} initial="hidden" animate="visible" exit="exit"
            className='
                fixed z-50 top-0 start-0 w-full h-[100dvh] flex items-center justify-center 
                bg-[var(--opacity-black-color)] overflow-hidden main-p
            '
        >

            <motion.div
                ref={boxRef}
                variants={Animations.scaleVariants}
                className='w-md max-w-full p-5 bg-[var(--white-color)] rounded-md'
            >
                {children}
            </motion.div>

        </motion.section>

    </React.Fragment>

}
