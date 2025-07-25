import React, { useState } from 'react';
import Input from '../../components/inputs/manual-inputs/Input';
import FormBtn from '../../components/buttons/FormBtn';
import { useFormik } from 'formik';
import { LoginValidationSchema } from '../../validations/loginValidation';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Animations from '../../animations/Animations';
import { useNavigate } from 'react-router-dom';
import { useApiMutation } from './../../hooks/useApiMutation';
import { ROUTES } from './../../constants/routes';
import { endpoints } from '../../constants/endPoints';
import PopUp from './../../components/pop-up/PopUp';
import ResponseBox from './../../components/pop-up/response-box/ResponseBox';
import LoadingCircle from '../../components/loading-circle/LoadingCircle';

// ====== import-images ====== //

import bgImage from '../../assets/images/login-page.png';
import logo from '../../assets/images/logo.png';

export default function Login() {

    const { t } = useTranslation();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const values = {
        email: '',
        password: ''
    };

    const loginMutation = useApiMutation({

        onSuccess: (data) => {
            setSuccessMsg("loginSuccessMsg");
            sessionStorage.setItem("token", data.data.tokens.accessToken);
            setTimeout(() => {
                setSuccessMsg(null);
                navigate(ROUTES.HOME_ROUTE);
            }, 2700);
        },

        onError: (error) => {
            setErrorMsg(error.response?.data?.message || error.message || "loginErrorMsg");
            console.log(error);
            setTimeout(() => {setErrorMsg(null)}, 3000);
        }

    });

    const handleOnSubmit = (values) => {
        loginMutation.mutate({
            method: "post",
            endpoint: endpoints.authentication.login,
            data: values
        });
    }

    const formikObj = useFormik ({
        initialValues: values,
        onSubmit: handleOnSubmit,
        validationSchema: LoginValidationSchema(t),
    });

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <PopUp><ResponseBox type={true} msg={successMsg} /></PopUp>}
            {errorMsg && <PopUp><ResponseBox type={false} msg={errorMsg} /></PopUp>}
        </AnimatePresence>

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

                <motion.img src={logo} 
                    variants={Animations.scaleVariants} className='w-32' 
                    alt="art-hub logo image" loading='lazy'
                />

                <motion.div variants={Animations.toRightVariants} className='w-full'>
                    <Input id={'email'} 
                        label={'emailWord'} type={'text'} password={false}
                        loading={true} placeHolder={'emailPlaceHolder'} disabled={loginMutation.isPending}
                        onChange={formikObj.handleChange} value={formikObj.values.email}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.email && formikObj.errors.email ? formikObj.errors.email : null}
                    />
                </motion.div>

                <motion.div variants={Animations.toLeftVariants} className='w-full'>
                    <Input id={'password'} 
                        label={'passwordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'passwordPlaceHolder'} disabled={loginMutation.isPending}
                        onChange={formikObj.handleChange} value={formikObj.values.password}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                    />
                </motion.div>

                <motion.div variants={Animations.toTopVariants} className='w-full'>
                    <FormBtn title={loginMutation.isPending ? '' : 'loginWord'}
                        disabled={loginMutation.isPending}
                        rounded={'rounded-md'} color={'var(--dark-blue-color)'} 
                        bgColor={'var(--sky-blue-color)'} type={'submit'}
                        {...loginMutation.isPending ? {icon: <LoadingCircle 
                            className={'w-5 h-5 border-3 border-t-[transparent] border-[var(--dark-blue-color)]' }
                        />} : {}}
                    />
                </motion.div>

            </motion.form>

        </section>

    </React.Fragment>

}
