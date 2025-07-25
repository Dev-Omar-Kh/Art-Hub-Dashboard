import React, { useState } from 'react';
import MainTitle from '../../../components/Titles/MainTitle';
import PathSteps from '../../../components/path-steps/PathSteps';
import { ROUTES } from '../../../constants/routes';
import ElementBox from '../../../components/elements-box/ElementBox';
import Input from '../../../components/inputs/manual-inputs/Input';
import Textarea from './../../../components/inputs/textarea/Textarea';
import ImgInput from './../../../components/inputs/images-input/ImgInput';
import FormBtn from '../../../components/buttons/FormBtn';
import { RiMailSendLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { sendMsgValidation } from '../../../validations/sendMsgValidation';
import { useTranslation } from 'react-i18next';
import { useFetchQuery } from '../../../hooks/useFetchQuery';
import { endpoints } from '../../../constants/endPoints';
import FetchError from '../../../components/error/FetchError';
import UserInfoLoading from './UserInfoLoading';
import { FaRegFileAlt } from 'react-icons/fa';
import { useApiMutation } from '../../../hooks/useApiMutation';
import PopUp from '../../../components/pop-up/PopUp';
import ResponseBox from '../../../components/pop-up/response-box/ResponseBox';
import { AnimatePresence } from 'framer-motion';
import LoadingCircle from '../../../components/loading-circle/LoadingCircle';

const paths = [
    {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
    {id: 2, title: 'sendMessageWord'},
];

const values = {
    subject: '',
    message: '',
    attachments: []
};

export default function MessageForm() {

    const {t} = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleGoBack = () => {
        navigate(-1);
    }

    // ====== get-user-data ====== //

    const {data, isLoading, isError} = useFetchQuery(["userInfoMsg", id], `${endpoints.users.getUsers}/${id}`);

    // ====== send-message ====== //

    const sendMessageMutation = useApiMutation({

        onSuccess: () => {
            setSuccessMsg("sndSuccessMsg");
            setTimeout(() => {
                setSuccessMsg(null);
                navigate(ROUTES.USERS_ROUTE);
            }, 2700);
        },

        onError: (error) => {
            console.log(error);
            setErrorMsg(error.response?.data?.message || error.message || "sendErrorMsg");
            setTimeout(() => {setErrorMsg(null)}, 3000);
        }

    });

    const handleOnSubmit = (values) => {

        const formData = new FormData();
        formData.append('subject', values.subject);
        formData.append('message', values.message);
        if (values.attachments && values.attachments.length > 0) {
            values.attachments.forEach((file) => {
                formData.append('attachments', file);
            });
        }

        sendMessageMutation.mutate({
            method: "post",
            endpoint: `${endpoints.users.getUsers}/${id}/${endpoints.users.sendMessage}`,
            data: formData
        });
    }

    const formikObj = useFormik({
        initialValues: values,
        onSubmit: handleOnSubmit,
        validationSchema: sendMsgValidation(t),
    });

    return <React.Fragment>

        <AnimatePresence>
            {successMsg && <PopUp><ResponseBox type={true} msg={successMsg} /></PopUp>}
            {errorMsg && <PopUp><ResponseBox type={false} msg={errorMsg} /></PopUp>}
        </AnimatePresence>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'sendMessageWord'} slogan={'sendMessagePageSlogan'} />

            <PathSteps paths={paths} />

            {isError && <FetchError className='w-full h-118' />}

            {!isError && <div className='w-full p-5 flex flex-col gap-5 rounded-2xl bg-[var(--white-color)]'>

                {isLoading && <UserInfoLoading />}

                {data?.data && <div 
                    className='
                        w-full p-2.5 flex items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]
                        border-l-4 border-[var(--dark-blue-color)]
                    '
                >

                    <img 
                        src={data?.data.profileImage.url} alt={`${data?.data.displayName} Profile image`} 
                        className='w-20 h-20 rounded-full object-cover border-2 border-[var(--dark-blue-color)]' 
                    />

                    <div className='flex flex-col gap-1.5'>

                        <h3 className='text-xl font-semibold text-[var(--dark-blue-color)]'>{data?.data.displayName}</h3>

                        <p className='text-base text-[var(--gray-color)]'>{data?.data.email}</p>

                        <div className='flex items-center gap-2.5'>
                            <p className='text-base text-[var(--gray-color)]'>{t('statusWord')} :</p>
                            <div>
                                <ElementBox 
                                    title={data?.data.isActive ? 'activeWord' : 'inactiveWord'} 
                                    color={data?.data.isActive ? 'var(--green-color)' : 'var(--red-color)'} 
                                    bgColor={data?.data.isActive ? 'var(--light-green-color)' : 'var(--light-red-color)'} />
                            </div>
                        </div>

                    </div>

                </div>}

                <form onSubmit={formikObj.handleSubmit} className='w-full flex flex-col gap-5'>

                    <Input id={'subject'} 
                        label={'messageSubjectWord'} type={'text'} password={false}
                        disabled={sendMessageMutation.isPending || isLoading}
                        loading={true} placeHolder={'messageSubjectPlaceHolder'}
                        onChange={formikObj.handleChange} value={formikObj.values.subject}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
                    />

                    <Textarea id={'message'} 
                        label={'messageTextWord'} 
                        placeHolder={'messageTextPlaceholder'} 
                        value={formikObj.values.message}
                        disabled={sendMessageMutation.isPending || isLoading}
                        onChange={formikObj.handleChange} onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.message && formikObj.errors.message ? formikObj.errors.message : null}
                    />

                    <ImgInput id={'attachments'}
                        label={'uploadFilesWord'} multiple={true}
                        value={formikObj.values.attachments} asImage={false}
                        disabled={sendMessageMutation.isPending || isLoading}
                        icon={<FaRegFileAlt />}
                        onChange={(event) => {
                            const attachments = Array.from(event.target.files);
                            if (attachments.length > 0) {
                                formikObj.setFieldValue('attachments', attachments);
                            }
                        }}
                        onBlur={formikObj.handleBlur}
                    />

                    <div className='w-full flex items-center justify-end gap-2.5'>

                        <FormBtn title={'cancelWord'} onClick={handleGoBack}
                            bgColor={'var(--gray-color)'} type={'button'}
                            width={'fit'} rounded={'rounded-md'} color={'var(--white-color)'} 
                        />

                        <FormBtn title={sendMessageMutation.isPending ? '' : 'sendWord'} 
                            icon={sendMessageMutation.isPending
                                ? <LoadingCircle className={'w-5 h-5 border-3 border-t-[transparent] border-[var(--white-color)]'}/>
                                : <RiMailSendLine className='text-xl' />
                            } width={'fit'} disabled={sendMessageMutation.isPending || isLoading}
                            rounded={'rounded-md'} color={'var(--white-color)'} 
                            bgColor={'var(--dark-blue-color)'} type={'submit'}
                        />

                    </div>

                </form>

            </div>}

        </section>

    </React.Fragment>

}
