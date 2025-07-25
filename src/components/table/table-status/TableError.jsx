import React from 'react'
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';
import Animations from '../../../animations/Animations';

export default function TableError({icon, msg, isRed}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <tr className='border-t border-solid border-[var(--mid-gray-color)]'>

            <td colSpan="100%" className={`text-xl font-semibold ${isRed ? 'text-[var(--red-color)]' : 'text-[var(--gray-color)]'}`}>

                <motion.div 
                    variants={Animations.scaleVariants} initial='hidden' animate='visible' exit={'exit'}
                    className='w-full flex flex-col py-5 items-center justify-center overflow-hidden'
                >
                    <Lottie className='w-28' animationData={icon} loop={false} />
                    <motion.p variants={Animations.toTopVariants}>{t(msg)}</motion.p>
                </motion.div>

            </td>

        </tr>

    </React.Fragment>

}