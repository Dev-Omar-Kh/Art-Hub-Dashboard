import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../animations/Animations';

export default function LoadingRow({className = ''}) {

    return <React.Fragment>

        <motion.div 
            variants={Animations.loadingVariants}
            initial={'hidden'} animate={'visible'}
            className={`bg-[var(--mid-light-gray-color)] ${className}`}
        ></motion.div>

    </React.Fragment>

}
