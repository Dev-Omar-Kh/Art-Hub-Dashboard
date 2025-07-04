import React from 'react'
import Numbers from '../../services/convertNum'
import { useTranslation } from 'react-i18next'
import CurrencyImage from '../currency/CurrencyImage';

export default function ProfileAchieve({achieveData}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div 
            className='
                grid grid-cols-2 gap-2.5 rounded-2xl max-[735px]:col-span-1
                bg-[var(--white-color)] p-5 col-span-3 max-[480px]:grid-cols-1
            '
        >

            {achieveData.map((item) => (
                <div 
                    key={item.id}
                    className='p-2.5 flex flex-col items-center justify-center rounded-md bg-[var(--light-gray-color)]'
                >
                    <div 
                        className={`
                            flex items-center justify-center gap-1 text-3xl font-semibold 
                            ${item.isMoney ? 'text-[var(--green-color)]' :  'text-[var(--dark-blue-color)]'}
                        `}
                    >
                        <p>{Numbers(item.value, i18n.language)}</p>
                        {item.isMoney && <CurrencyImage width={'w-5'} color='green' />}
                        {item.icon && <span style={{color: item.iconColor}} className='text-xl'>{item.icon}</span>}
                    </div>
                    <h3 className='text-lg text-center font-medium text-[var(--gray-color)]'>{t(item.title)}</h3>
                </div>
            ))}

        </div>

    </React.Fragment>

}
