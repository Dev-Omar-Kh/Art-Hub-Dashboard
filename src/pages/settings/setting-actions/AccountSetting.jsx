import React, { useState } from 'react'
import ImgInput from '../../../components/inputs/images-input/ImgInput'
import Input from '../../../components/inputs/manual-inputs/Input'
import { RxUpdate } from 'react-icons/rx'
import FormBtn from '../../../components/buttons/FormBtn'
import { useFetchQuery } from '../../../hooks/useFetchQuery'
import { endpoints } from '../../../constants/endPoints'
import { useApiMutation } from '../../../hooks/useApiMutation'
import { useFormik } from 'formik'
import { profileValidation } from '../../../validations/profileValidation'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../constants/routes'
import { IoMdImages } from 'react-icons/io'
import { AnimatePresence } from 'framer-motion'
import ResponseBox from '../../../components/pop-up/response-box/ResponseBox'
import PopUp from '../../../components/pop-up/PopUp'
import LoadingCircle from '../../../components/loading-circle/LoadingCircle'

export default function AccountSetting() {

    const {t} = useTranslation();
    const navigate = useNavigate();

    // ====== get-profile-data ====== //

    const {data, isLoading} = useFetchQuery(['oneAdmin'], `${endpoints.admins.profile}`);
    const profileInfo = data?.data;

    // ====== setup-formik ====== //

    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const values = {
        profileImage: profileInfo?.profileImage.url || '',
        displayName: profileInfo?.displayName || '',
        email: profileInfo?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    }

    const updateProfileMutation = useApiMutation({

        onSuccess: () => {
            const msg = "updateProfileSuccessMsg";
            setSuccessMsg(msg);
            setTimeout(() => {
                setSuccessMsg(null);
                setTimeout(() => {navigate(ROUTES.HOME_ROUTE, { replace: true })}, 300);
            }, 2700);
        },

        onError: (error) => {
            console.log(error);
            const msg = "updateProfileErrorMsg";
            setErrorMsg(error.response?.data?.message || error.message || msg);
            setTimeout(() => {setErrorMsg(null)}, 3000);
        }

    });

    const handleOnSubmit = (values) => {

        const formData = new FormData();
        formData.append('displayName', values.displayName);
        formData.append('email', values.email);

        if (values.newPassword) {
            formData.append('newPassword', values.newPassword);
        }

        if (values.confirmNewPassword) {
            formData.append('confirmNewPassword', values.confirmNewPassword);
        }

        if (values.currentPassword) {
            formData.append('currentPassword', values.currentPassword);
        }

        if (values.profileImage instanceof File) {
            formData.append('profileImage', values.profileImage);
        }

        updateProfileMutation.mutate({
            method: 'put',
            endpoint: endpoints.admins.profile,
            data: formData
        });

    }

    const formikObj = useFormik({
        initialValues: values,
        onSubmit: handleOnSubmit,
        validationSchema: profileValidation(t),
        enableReinitialize: true,
    });

    const disabledStatus = isLoading || updateProfileMutation.isPending

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <PopUp><ResponseBox type={true} msg={successMsg} /></PopUp>}
            {errorMsg && <PopUp><ResponseBox type={false} msg={errorMsg} /></PopUp>}
        </AnimatePresence>

        <form onSubmit={formikObj.handleSubmit} className='w-full grid grid-cols-2 gap-5'>

            <div className='col-span-2'>

                <ImgInput id={'profileImage'}
                    icon={<IoMdImages />}
                    label={'updateImageWord'} 
                    asImage={true}
                    disabled={disabledStatus}
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
                disabled={disabledStatus}
                ValidationError={formikObj.touched.displayName && 
                    formikObj.errors.displayName ? formikObj.errors.displayName : null
                }
            />

            <Input id={'email'} 
                label={'emailWord'} type={'text'} password={false}
                loading={true} placeHolder={'emailPlaceHolder'}
                onChange={formikObj.handleChange} value={formikObj.values.email}
                onBlur={formikObj.handleBlur} 
                disabled={disabledStatus}
                ValidationError={formikObj.touched.email && formikObj.errors.email ? formikObj.errors.email : null}
            />

            <Input id={'currentPassword'} 
                label={'currentPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'currentPasswordPlaceHolder'}
                onChange={formikObj.handleChange} value={formikObj.values.currentPassword}
                onBlur={formikObj.handleBlur} 
                disabled={disabledStatus}
                ValidationError={formikObj.touched.currentPassword && 
                    formikObj.errors.currentPassword ? formikObj.errors.currentPassword : null
                }
            />

            <Input id={'newPassword'} 
                label={'newPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'newPasswordPlaceHolder'}
                onChange={formikObj.handleChange} value={formikObj.values.newPassword}
                onBlur={formikObj.handleBlur} 
                disabled={disabledStatus}
                ValidationError={formikObj.touched.newPassword && formikObj.errors.newPassword ? formikObj.errors.newPassword : null}
            />

            <Input id={'confirmNewPassword'} 
                label={'confirmNewPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'confirmNewPasswordPlaceHolder'}
                onChange={formikObj.handleChange} value={formikObj.values.confirmNewPassword}
                onBlur={formikObj.handleBlur} 
                disabled={disabledStatus}
                ValidationError={formikObj.touched.confirmNewPassword && 
                    formikObj.errors.confirmNewPassword ? formikObj.errors.confirmNewPassword : null
                }
            />

            <div className='col-span-2 flex items-center justify-end gap-2.5'>

                <FormBtn title={updateProfileMutation.isPending ? '' : 'updateWord'} 
                    icon={
                        updateProfileMutation.isPending 
                            ? <LoadingCircle className={'w-5 h-5 border-3 border-t-[transparent] border-[var(--white-color)]'}/>
                            : <RxUpdate className='text-xl' />
                    } 
                    width={'fit'} disabled={disabledStatus} 
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                    bgColor={'var(--dark-blue-color)'} type={'submit'}
                />

            </div>

        </form>

    </React.Fragment>

}
