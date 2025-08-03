import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Animations from '../../animations/Animations';
import warningIcon from '../../assets/jsons/warning.json';
import Lottie from 'lottie-react';

export default function EmptyData({msg}) {

    const {t} = useTranslation();

    return <React.Fragment>
        <motion.div 
            variants={Animations.scaleVariants} initial='hidden' animate='visible' exit={'exit'}
            className='w-full flex flex-col py-5 items-center justify-center overflow-hidden'
        >
            <motion.div variants={Animations.scaleVariants}>
                <Lottie className='w-28' animationData={warningIcon} loop={false} />
            </motion.div>
            <motion.p 
                variants={Animations.toTopVariants}
                className='text-xl font-semibold text-[var(--dark-blue-color)] text-center'
            >{t(msg)}</motion.p>
        </motion.div>
    </React.Fragment>

}
