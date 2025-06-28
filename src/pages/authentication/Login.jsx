import React from 'react';
import Input from '../../components/inputs/manual-inputs/Input';
import FormBtn from '../../components/buttons/FormBtn';
import { useFormik } from 'formik';
import loginService from '../../services/loginService';
import { LoginValidationSchema } from '../../validations/loginValidation';
import { useTranslation } from 'react-i18next';

import bgImage from '../../assets/images/login-page.png';
import logo from '../../assets/images/logo.png';
import { motion } from 'framer-motion';
import Animations from '../../animations/Animations';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const values = {
        email: '',
        password: ''
    };

    const formikObj = useFormik ({

        initialValues: values,

        onSubmit: (values) => loginService(values, navigate),

        validationSchema: LoginValidationSchema(t)

    });

    return <React.Fragment>

        <section 
            className='w-full min-h-[100dvh] common-p flex items-center justify-center bg-center bg-cover bg-no-repeat'
            style={{ backgroundImage: `url(${bgImage})` }}
        >

            <motion.form 
                variants={Animations.parentVariants}
                initial='hidden' animate='visible' exit='exit'
                onSubmit={formikObj.handleSubmit}
                className='
                    w-xl max-w-full py-5 px-[4.5%] bg-[var(--white-color)] flex flex-col items-center justify-center gap-5
                    rounded-2xl border border-solid border-[var(--sky-blue-color)]
                    shadow-[4px_4px_8px_4px_var(--sky-blue-color)] overflow-hidden
                '
            >

                <motion.img 
                    variants={Animations.scaleVariants} className='w-32' 
                    src={logo} alt="art-hub logo image" loading='lazy'
                />

                <motion.div variants={Animations.toRightVariants} className='w-full'>
                    <Input id={'email'} 
                        label={'emailWord'} type={'text'} password={false}
                        loading={true} placeHolder={'emailPlaceHolder'}
                        onChange={formikObj.handleChange} value={formikObj.values.email}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.email && formikObj.errors.email ? formikObj.errors.email : null}
                    />
                </motion.div>

                <motion.div variants={Animations.toLeftVariants} className='w-full'>
                    <Input id={'password'} 
                        label={'passwordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'passwordPlaceHolder'}
                        onChange={formikObj.handleChange} value={formikObj.values.password}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                    />
                </motion.div>

                <motion.div variants={Animations.toTopVariants} className='w-full'>
                    <FormBtn title={'loginWord'} 
                        rounded={'rounded-md'} color={'var(--dark-blue-color)'} 
                        bgColor={'var(--sky-blue-color)'} type={'submit'}
                    />
                </motion.div>

            </motion.form>

        </section>

    </React.Fragment>

}
