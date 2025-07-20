import React from 'react'
import MainTitle from '../../../components/Titles/MainTitle'
import ImgInput from '../../../components/inputs/images-input/ImgInput'
import Input from '../../../components/inputs/manual-inputs/Input'
import FormBtn from '../../../components/buttons/FormBtn'
import { IoIosAddCircleOutline } from 'react-icons/io'

export default function AddAdmin() {

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>
        
            <MainTitle title={'addAdminWord'} slogan={'addAdminSlogan'} />

            <form 
                className='
                    w-full p-5 grid grid-cols-2 gap-5 rounded-2xl 
                    bg-[var(--white-color)] shadow-[0_0px_10px_var(--shadow-black-color)]
                '
            >

                <div className='col-span-2'>

                    <ImgInput id={'image'}
                        label={'addImageWord'} 
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

                <Input id={'name'} 
                    label={'nameWord'} type={'text'} password={false}
                    loading={true} placeHolder={'namePlaceHolder'}
                    // onChange={formikObj.handleChange} value={formikObj.values.subject}
                    // onBlur={formikObj.handleBlur}
                    // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
                />

                <Input id={'email'} 
                    label={'emailWord'} type={'text'} password={false}
                    loading={true} placeHolder={'emailPlaceHolder'}
                    // onChange={formikObj.handleChange} value={formikObj.values.subject}
                    // onBlur={formikObj.handleBlur}
                    // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
                />

                <Input id={'password'} 
                    label={'passwordWord'} type={'password'} password={true}
                    loading={false} placeHolder={'passwordPlaceHolder'}
                    // onChange={formikObj.handleChange} value={formikObj.values.password}
                    // onBlur={formikObj.handleBlur}
                    // ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                />
    
                <Input id={'confirmPassword'} 
                    label={'confirmPasswordWord'} type={'password'} password={true}
                    loading={false} placeHolder={'confirmPasswordPlaceHolder'}
                    // onChange={formikObj.handleChange} value={formikObj.values.password}
                    // onBlur={formikObj.handleBlur}
                    // ValidationError={formikObj.touched.password && formikObj.errors.password ? formikObj.errors.password : null}
                />

                <div className='col-span-2 flex items-center justify-end gap-2.5'>

                    <FormBtn title={'addWord'} 
                        icon={<IoIosAddCircleOutline className='text-xl' />} width={'fit'} 
                        rounded={'rounded-md'} color={'var(--white-color)'} 
                        bgColor={'var(--dark-blue-color)'} type={'submit'}
                    />

                </div>

            </form>

        </section>

    </React.Fragment>

}
