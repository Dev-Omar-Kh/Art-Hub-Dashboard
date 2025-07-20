import React from 'react';
import CheckBox from '../../../components/inputs/check-box-input/CheckBox';
import FormBtn from '../../../components/buttons/FormBtn';
import { LuSave } from 'react-icons/lu';

const checkBoxData = [

    {
        id: 'allowArtists',
        title: 'allowArtistsRegisteringWord',
        label: 'allowArtistsRegisteringLabel',
    },

    {
        id: 'allowUsers',
        title: 'allowUsersRegisteringWord',
        label: 'allowUsersRegisteringLabel',
    }

];

export default function UsersSetting() {

    return <React.Fragment>

        <form className='w-full flex flex-col gap-5'>

            {checkBoxData.map(((box, idx) => <CheckBox key={idx} id={box.id} title={box.title} label={box.label} />))}

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
