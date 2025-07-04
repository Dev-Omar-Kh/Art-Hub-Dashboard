import React from 'react'
import ImgInput from '../../../components/inputs/images-input/ImgInput'
import Input from '../../../components/inputs/manual-inputs/Input'
import { RxUpdate } from 'react-icons/rx'
import FormBtn from '../../../components/buttons/FormBtn'

export default function AccountSetting() {

    return <React.Fragment>

        <form className='w-full grid grid-cols-2 gap-5'>

            <div className='col-span-2'>

                <ImgInput id={'image'}
                    label={'updateImageWord'} 
                    // value={formikObj.values.files} 
                    // onChange={(event) => {
                    //     const files = Array.from(event.target.files);
                    //     if (files.length > 0) {
                    //         formikObj.setFieldValue('files', files);
                    //     }
                    // }}
                    // onBlur={formikObj.handleBlur}
                />

            </div>

            <Input id={'email'} 
                label={'emailWord'} type={'text'} password={false}
                loading={true} placeHolder={'emailPlaceHolder'}
                // onChange={formikObj.handleChange} value={formikObj.values.subject}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
            />

            <Input id={'currentPassword'} 
                label={'currentPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'currentPasswordPlaceHolder'}
                // onChange={formikObj.handleChange} value={formikObj.values.password}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
            />

            <Input id={'newPassword'} 
                label={'newPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'newPasswordPlaceHolder'}
                // onChange={formikObj.handleChange} value={formikObj.values.password}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
            />

            <Input id={'confirmNewPassword'} 
                label={'confirmNewPasswordWord'} type={'password'} password={true}
                loading={false} placeHolder={'confirmNewPasswordPlaceHolder'}
                // onChange={formikObj.handleChange} value={formikObj.values.password}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
            />

            <div className='col-span-2 flex items-center justify-end gap-2.5'>

                <FormBtn title={'updateWord'} 
                    icon={<RxUpdate className='text-xl' />} width={'fit'} 
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                    bgColor={'var(--dark-blue-color)'} type={'submit'}
                />

            </div>

        </form>

    </React.Fragment>

}
