import React from 'react';
import MainTitle from '../../../components/Titles/MainTitle';
import PathSteps from '../../../components/path-steps/PathSteps';
import { ROUTES } from '../../../constants/routes';
import ElementBox from '../../../components/elements-box/ElementBox';
import Input from '../../../components/inputs/manual-inputs/Input';
import Textarea from './../../../components/inputs/textarea/Textarea';
import ImgInput from './../../../components/inputs/images-input/ImgInput';
import FormBtn from '../../../components/buttons/FormBtn';
import { RiMailSendLine } from 'react-icons/ri';
import { LuTrash2 } from 'react-icons/lu';
import { useFormik } from 'formik';
import sendMessageService from '../../../services/SendMessage';
import { useNavigate } from 'react-router-dom';

// ====== import-images ====== //

import pfpImg from '../../../assets/images/artist.jpg';
import { sendMsgValidation } from '../../../validations/sendMsgValidation';
import { useTranslation } from 'react-i18next';

export default function MessageForm() {

    const {t} = useTranslation();
    const navigate = useNavigate();

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'sendMessageWord'},
    ];

    const values = {
        subject: '',
        message: '',
        files: []
    };

    const formikObj = useFormik({
        initialValues: values,
        onSubmit: (values) => sendMessageService(values, navigate),
        validationSchema: sendMsgValidation(t),
    });

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'sendMessageWord'} slogan={'sendMessagePageSlogan'} />

            <PathSteps paths={paths} />

            <div className='w-full p-5 flex flex-col gap-5 rounded-2xl bg-[var(--white-color)]'>

                <div 
                    className='
                        w-full p-2.5 flex items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]
                        border-l-4 border-[var(--dark-blue-color)]
                    '
                >

                    <img 
                        src={pfpImg} alt={`Profile image`} 
                        className='w-20 h-20 rounded-full object-cover border-2 border-[var(--dark-blue-color)]' 
                    />

                    <div className='flex flex-col gap-1.5'>

                        <h3 className='text-xl font-semibold text-[var(--dark-blue-color)]'>فاطمة احمد</h3>

                        <p className='text-base text-[var(--gray-color)]'>mariam.khalid@email.com</p>

                        <div className='flex items-center gap-2.5'>
                            <p className='text-base text-[var(--gray-color)]'>آخر ظهور :</p>
                            <div>
                                <ElementBox title={'activeWord'} color={'var(--green-color)'} bgColor={'var(--light-green-color)'} />
                            </div>
                        </div>

                    </div>

                </div>

                <form onSubmit={formikObj.handleSubmit} className='w-full flex flex-col gap-5'>

                    <Input id={'subject'} 
                        label={'messageSubjectWord'} type={'text'} password={false}
                        loading={true} placeHolder={'messageSubjectPlaceHolder'}
                        onChange={formikObj.handleChange} value={formikObj.values.subject}
                        onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
                    />

                    <Textarea id={'message'} 
                        label={'messageTextWord'} 
                        placeHolder={'messageTextPlaceholder'} 
                        value={formikObj.values.message}
                        onChange={formikObj.handleChange} onBlur={formikObj.handleBlur}
                        ValidationError={formikObj.touched.message && formikObj.errors.message ? formikObj.errors.message : null}
                    />

                    <ImgInput id={'files'}
                        label={'uploadFilesWord'} 
                        value={formikObj.values.files} 
                        onChange={(event) => {
                            const files = Array.from(event.target.files);
                            if (files.length > 0) {
                                formikObj.setFieldValue('files', files);
                            }
                        }}
                        onBlur={formikObj.handleBlur}
                    />

                    <div className='w-full flex items-center justify-end gap-2.5'>

                        <FormBtn title={'cancelWord'} 
                            icon={<LuTrash2 className='text-xl' />} width={'fit'} 
                            rounded={'rounded-md'} color={'var(--red-color)'} 
                            bgColor={'var(--light-red-color)'} type={'button'}
                        />

                        <FormBtn title={'sendWord'} 
                            icon={<RiMailSendLine className='text-xl' />} width={'fit'} 
                            rounded={'rounded-md'} color={'var(--white-color)'} 
                            bgColor={'var(--dark-blue-color)'} type={'submit'}
                        />

                    </div>

                </form>

            </div>

        </section>

    </React.Fragment>

}
