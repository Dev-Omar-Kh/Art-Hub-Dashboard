import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5';
import FormBtn from '../../buttons/FormBtn';
import LoadingCircle from '../../loading-circle/LoadingCircle';
import Input from '../../inputs/manual-inputs/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function WarningBox({
    title, onClose, msg, icon, iconColor = 'var(--red-color)', confirm, isLoading,
    isInput, inputSetup, setValues, formikConfig
}) {

    const {t} = useTranslation();

    const handleConfirmation = (values) => {
        setValues(values);
        confirm(true);
    }

    const formikObj = useFormik({
        initialValues: isInput && formikConfig.values,
        validationSchema: isInput && formikConfig.validationSchema,
        onSubmit: isInput && handleConfirmation,
    });

    return <React.Fragment>

        <div className='flex flex-col gap-5'>

            <div className="flex items-center justify-between">

                <div className='flex items-center gap-1.5 text-3xl' style={{color: iconColor}}>
                    {icon && icon}
                    <h3 className="text-2xl font-semibold text-[var(--dark-blue-color)]">{t(title)}</h3>
                </div>

                <button
                    onClick={onClose}
                    className="
                        p-1 bg-[var(--sky-blue-color)] 
                        rounded-full w-8 h-8 flex items-center justify-center text-[var(--dark-blue-color)] cursor-pointer
                        duration-300 hover:bg-[var(--mid-blue-color)]
                    "
                >
                    <IoClose className="text-xl" />
                </button>

            </div>

            <div className='w-full h-[0.0625rem] bg-[var(--sky-blue-color)] rounded-4xl'></div>

            <p className='text-base font-medium text-[var(--gray-color)]'>{t(msg)}</p>

            {isInput && <Input id={inputSetup.id} 
                label={inputSetup.label} type={inputSetup.type} password={inputSetup.isPassword}
                loading={true} placeHolder={inputSetup.placeHolder}
                onChange={formikObj.handleChange} value={formikObj.values[inputSetup.id]}
                onBlur={formikObj.handleBlur} 
                disabled={isLoading}
                ValidationError={formikObj.touched[inputSetup.id] && formikObj.errors[inputSetup.id] ? formikObj.errors[inputSetup.id] : null}
            />}

            <div className='w-full h-[0.0625rem] bg-[var(--sky-blue-color)] rounded-4xl'></div>

            <div className='col-span-2 flex items-center justify-end gap-2.5'>

                <FormBtn title={'cancelWord'} onClick={onClose} {...isLoading ? {disabled: true} : {}}
                    width={'fit'} bgColor={'var(--gray-color)'} type={'button'}
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                />

                <FormBtn title={isLoading ? '' : 'confirmWord'} onClick={() => isInput ? formikObj.handleSubmit() : confirm(true)}
                    width={'fit'} bgColor={iconColor} type={'button'}
                    rounded={'rounded-md'} color={'var(--white-color)'} {...isLoading ? {disabled: true} : {}}
                    {...isLoading ? {icon: <LoadingCircle 
                        className={'w-5 h-5 border-3 border-t-[transparent] border-[var(--white-color)]' }
                    />} : {}}
                />

            </div>

        </div>

    </React.Fragment>

}
