import React from 'react';
import FormBtn from '../../../components/buttons/FormBtn';
import { LuSave } from 'react-icons/lu';
import CheckBox from '../../../components/inputs/check-box-input/CheckBox';
import Input from '../../../components/inputs/manual-inputs/Input';
import ListInput from './../../../components/inputs/list-input/ListInput';

const checkBoxData = [

    {
        id: 'allowOrders',
        title: 'allowCreateOrdersWord',
        label: 'allowCreateOrdersLabel',
    },

];

export default function PaymentSetting() {

    return <React.Fragment>

        <form className='w-full grid grid-cols-2 gap-5'>

            {checkBoxData.map(((box, idx) => <div key={idx} className='col-span-2'>
                <CheckBox id={box.id} title={box.title} label={box.label} />
            </div>))}

            <Input id={'paymentInfo'} 
                label={'paymentInfoWord'} type={'text'} password={false}
                loading={true} placeHolder={'paymentInfoPlaceHolder'}
                // onChange={formikObj.handleChange} value={formikObj.values.subject}
                // onBlur={formikObj.handleBlur}
                // ValidationError={formikObj.touched.subject && formikObj.errors.subject ? formikObj.errors.subject : null}
            />

            <ListInput 
                id={'role'} label={'choosePaymentMethodWord'}
                placeHolder={'choosePaymentMethodPlaceholder'}
                options={["Stripe", "PayPal", "Adyen"]}
                // onChange={formikObj.handleChange} value={formikObj.values.role}
                // onBlur={formikObj.handleBlur}
            />

            <div className='col-span-2 flex items-center justify-end gap-2.5'>

                <FormBtn title={'saveChangesWord'} 
                    icon={<LuSave className='text-xl' />} width={'fit'} 
                    rounded={'rounded-md'} color={'var(--white-color)'} 
                    bgColor={'var(--dark-blue-color)'} type={'submit'}
                />

            </div>

        </form>

    </React.Fragment>

}
