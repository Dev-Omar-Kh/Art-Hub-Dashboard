import React, { useState } from 'react';
import MainTitle from '../../../components/Titles/MainTitle';
import ImgInput from '../../../components/inputs/images-input/ImgInput';
import Input from '../../../components/inputs/manual-inputs/Input';
import FormBtn from '../../../components/buttons/FormBtn';
import { IoIosAddCircleOutline, IoMdImages } from 'react-icons/io';
import { useApiMutation } from '../../../hooks/useApiMutation';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { endpoints } from '../../../constants/endPoints';
import { useFormik } from 'formik';
import ListInput from '../../../components/inputs/list-input/ListInput';
import {adminValidation } from '../../../validations/adminValidations';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import PopUp from '../../../components/pop-up/PopUp';
import ResponseBox from '../../../components/pop-up/response-box/ResponseBox';
import { useFetchQuery } from '../../../hooks/useFetchQuery';
import LoadingCircle from '../../../components/loading-circle/LoadingCircle';

export default function AddAdmin() {

    const {t} = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    // ====== Fetch admin data if editing ====== //

    const {data, isLoading} = useFetchQuery(
        ['oneAdmin', id], 
        `${endpoints.admins.getAdmins}/${id}`,
        {
            enabled: isEditMode,
        }
    );

    // ====== setup-formik-functionality ====== //

    const getInitialValues = () => {

        if (isEditMode && data?.data) {

            const admin = data.data;

            return {
                displayName: admin.displayName || '',
                email: admin.email || '',
                password: '',
                confirmPassword: '',
                role: admin.role === 'admin' 
                    ? {label: 'adminWord', value: 'admin'}
                    : admin.role === 'superadmin' 
                        ? {label: 'superadminWord', value: 'superadmin'}
                        : '',
                profileImage: admin.profileImage || ''
            };

        }
        
        return {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
            profileImage: ''
        };

    };

    const addAdminMutation = useApiMutation({

        onSuccess: () => {
            const msg = isEditMode ? "updateAdminSuccessMsg" : "addAdminSuccessMsg";
            setSuccessMsg(msg);
            setTimeout(() => {
                setSuccessMsg(null);
                setTimeout(() => {navigate(ROUTES.ADMINS_ROUTE, { replace: true })}, 300);
            }, 2700);
        },

        onError: (error) => {
            console.log(error);
            const msg = isEditMode ? "updateAdminErrorMsg" : "addAdminErrorMsg";
            setErrorMsg(error.response?.data?.message || error.message || msg);
            setTimeout(() => {setErrorMsg(null)}, 3000);
        }

    });

    const handleOnSubmit = (values) => {

        const formData = new FormData();
        formData.append('displayName', values.displayName);
        formData.append('email', values.email);
        formData.append('role', values.role.value || values.role);

        if (values.password) {
            formData.append('password', values.password);
        }

        if (values.profileImage instanceof File) {
            formData.append('profileImage', values.profileImage);
        }

        addAdminMutation.mutate({
            method: isEditMode ? 'put' : "post",
            endpoint: isEditMode ? `${endpoints.admins.getAdmins}/${id}` : endpoints.admins.getAdmins,
            data: formData
        });

    }

    const formikObj = useFormik({
        initialValues: getInitialValues(),
        onSubmit: handleOnSubmit,
        validationSchema: adminValidation(t, isEditMode),
        enableReinitialize: true,
    });

    const loadingState = addAdminMutation.isPending || (isEditMode && isLoading)

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <PopUp><ResponseBox type={true} msg={successMsg} /></PopUp>}
            {errorMsg && <PopUp><ResponseBox type={false} msg={errorMsg} /></PopUp>}
        </AnimatePresence>

        <section className='w-full flex flex-col gap-10'>
        
            <MainTitle 
                title={isEditMode ? 'updateAdminWord' : 'addAdminWord'} 
                slogan={isEditMode ? 'updateAdminSlogan' : 'addAdminSlogan'} 
            />

            <form 
                onSubmit={formikObj.handleSubmit}
                className='
                    w-full p-5 grid grid-cols-2 gap-5 rounded-2xl 
                    bg-[var(--white-color)] shadow-[0_0px_10px_var(--shadow-black-color)]
                '
            >

                <div className='col-span-2'>

                    <ImgInput id={'profileImage'}
                        icon={<IoMdImages />}
                        label={isEditMode ? 'updateImageWord' : 'addImageWord'} 
                        asImage={true}
                        disabled={loadingState}
                        value={formikObj.values.profileImage} 
                        onChange={(event) => {
                            const files = Array.from(event.target.files);
                            if (files.length > 0) {
                                formikObj.setFieldValue('profileImage', files[0]);
                            }
                        }}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.profileImage && 
                            formikObj.errors.profileImage ? formikObj.errors.profileImage : null
                        }
                    />

                </div>

                <Input id={'displayName'} 
                    label={'nameWord'} type={'text'} password={false}
                    loading={true} placeHolder={'namePlaceHolder'}
                    onChange={formikObj.handleChange} value={formikObj.values.displayName}
                    onBlur={formikObj.handleBlur} 
                    disabled={loadingState}
                    ValidationError={formikObj.touched.displayName && 
                        formikObj.errors.displayName ? formikObj.errors.displayName : null
                    }
                />

                <Input id={'email'} 
                    label={'emailWord'} type={'text'} password={false}
                    loading={true} placeHolder={'emailPlaceHolder'}
                    onChange={formikObj.handleChange} value={formikObj.values.email}
                    onBlur={formikObj.handleBlur} 
                    disabled={loadingState}
                    ValidationError={formikObj.touched.email && formikObj.errors.email ? formikObj.errors.email : null}
                />

                <ListInput 
                    id={'role'} label={'chooseAdminRoleWord'}
                    placeHolder={'chooseAdminRolePlaceholder'}
                    options={[{label: 'adminWord', value: 'admin'}, {label: 'superadminWord', value: 'superadmin'}]}
                    disabled={loadingState}
                    onChange={formikObj.handleChange} value={formikObj.values.role}
                    onBlur={formikObj.handleBlur}
                />

                <Input id={'password'} 
                    label={'passwordWord'} type={'password'} password={true}
                    loading={false} placeHolder={'passwordPlaceHolder'}
                    onChange={formikObj.handleChange} value={formikObj.values.password}
                    onBlur={formikObj.handleBlur} 
                    disabled={loadingState}
                    ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                />
    
                <Input id={'confirmPassword'} 
                    label={'confirmPasswordWord'} type={'password'} password={true}
                    loading={false} placeHolder={'confirmPasswordPlaceHolder'}
                    onChange={formikObj.handleChange} value={formikObj.values.confirmPassword}
                    onBlur={formikObj.handleBlur} 
                    disabled={loadingState}
                    ValidationError={formikObj.touched.confirmPassword && 
                        formikObj.errors.confirmPassword ? formikObj.errors.confirmPassword : null
                    }
                />

                <div className='col-span-2 flex items-center justify-end gap-2.5'>

                    <FormBtn title={addAdminMutation.isPending ? '' : isEditMode ? 'updateWord' : 'addWord'}
                        disabled={loadingState}
                        icon={
                            addAdminMutation.isPending 
                                ? <LoadingCircle className={'w-5 h-5 border-3 border-t-[transparent] border-[var(--white-color)]'}/>
                                : <IoIosAddCircleOutline className='text-xl' />
                        } width={'fit'} 
                        rounded={'rounded-md'} color={'var(--white-color)'} 
                        bgColor={'var(--dark-blue-color)'} type={'submit'}
                    />

                </div>

            </form>

        </section>

    </React.Fragment>

}
