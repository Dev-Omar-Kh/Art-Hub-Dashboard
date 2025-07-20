import React from 'react'
import Input from '../../../components/inputs/manual-inputs/Input'
import Textarea from '../../../components/inputs/textarea/Textarea'
import FormBtn from '../../../components/buttons/FormBtn'
import { RxUpdate } from 'react-icons/rx'

export default function PolicySetting() {

    return <React.Fragment>

        <form className='w-full grid grid-cols-2 gap-5'>

            <Input id={'privacyPolicy'} 
                label={'privacyPolicyLinkWord'} type={'text'} password={false}
                loading={true} placeHolder={'privacyPolicyLinkPlaceholder'}
                // onChange={formikObj.handleChange} value={formikObj.values.subject}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
            />

            <Input id={'termsAndConditions'} 
                label={'termsAndConditionsLinkWord'} type={'text'} password={false}
                loading={true} placeHolder={'termsAndConditionsLinkPlaceholder'}
                // onChange={formikObj.handleChange} value={formikObj.values.subject}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
            />

            {/* <div className='col-span-2'>

                <Textarea id={'message'} 
                    label={'messageTextWord'} 
                    placeHolder={'messageTextPlaceholder'} 
                    // value={formikObj.values.message}
                    // onChange={formikObj.handleChange} onBlur={formikObj.handleBlur}
                    // ValidationError={formikObj.touched.message && formikObj.errors.message ? formikObj.errors.message : null}
                />

            </div> */}

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
