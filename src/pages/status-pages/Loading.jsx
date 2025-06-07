import React from 'react';
import { motion } from 'framer-motion';

import logo from '../../assets/images/logo.png';
import bgImage from '../../assets/images/login-page.png';
import Animations from '../../animations/Animations';

export default function Loading() {

    return <React.Fragment>

        <motion.section
            variants={Animations.opacityVariants}
            initial='hidden' animate='visible' exit='exit'
            className='w-full h-[100dvh] flex items-center justify-center bg-center bg-cover bg-no-repeat' 
            style={{backgroundImage: `url(${bgImage})`}}
        >

            <motion.img 
                variants={Animations.loadingImageVariants} className='w-32' 
                src={logo} alt='logo for loading' loading='lazy'
            />

        </motion.section>

    </React.Fragment>

}
