import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../animations/Animations';

export default function PopUp({children}) {

    return <React.Fragment>

        <motion.section
            variants={Animations.parentVariants} initial="hidden" animate="visible" exit="exit"
            className='
                fixed z-50 top-0 start-0 w-full h-[100dvh] flex items-center justify-center 
                bg-[var(--opacity-black-color)] overflow-hidden
            '
        >

            <motion.div variants={Animations.scaleVariants}>
                {children}
            </motion.div>

        </motion.section>

    </React.Fragment>

}
