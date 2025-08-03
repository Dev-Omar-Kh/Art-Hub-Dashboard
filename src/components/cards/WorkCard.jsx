import React from 'react';
import Numbers from '../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import CurrencyImage from '../currency/CurrencyImage';
import ElementBox from '../elements-box/ElementBox';

export default function WorkCard({data}) {

    const {i18n} = useTranslation();

    return <React.Fragment>

        <div className='p-2.5 grid grid-cols-3 items-center gap-2.5 rounded-md bg-[var(--light-gray-color)]'>

            <img 
                className='w-full rounded-md h-28 object-cover max-[590px]:h-fit' 
                src={data.image} alt={`product ${'name'} image`} 
            />

            <div className='col-span-2 flex flex-col gap-5'>

                <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{data.title}</h3>

                <div className='flex items-center justify-between'>

                    <p className='flex items-center gap-1 text-lg font-medium text-[var(--green-color)]'>
                        {Numbers(data.price, i18n.language)}
                        <CurrencyImage width={'w-3'} color='green' />
                    </p>

                    <div>
                        <ElementBox 
                            shadow={true} title={data.isAvailable ? 'availableWord' : 'unavailableWord'} 
                            bgColor={data.isAvailable ? 'var(--light-green-color)' : 'var(--light-red-color)'} 
                            color={data.isAvailable ? 'var(--green-color)' : 'var(--red-color)'} 
                        />
                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
