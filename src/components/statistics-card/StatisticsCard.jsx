import React from 'react'
import Numbers from '../../services/convertNum'
import { useTranslation } from 'react-i18next'
import CurrencyImage from '../currency/CurrencyImage';

export default function StatisticsCard({data}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div 
            key={data.id} 
            className='
                p-5 rounded-2xl bg-[var(--white-color)] 
                flex flex-col gap-2.5 shadow-[0_0px_10px_var(--shadow-black-color)]'
        >

            <div className='w-full flex flex-col gap-1'>
                <h3 className='text-xl font-medium text-[var(--black-color)]'>{t(data.title)}</h3>
                <p className='flex items-center gap-1 text-3xl font-bold text-[var(--dark-blue-color)]'>
                    {data.isString ? data.value : Numbers(data.value, i18n.language)}
                    {data.isMoney && <CurrencyImage width={'w-5'} color='blue' />}
                </p>
            </div>

            <p 
                className={`
                    text-sm font-medium flex items-center gap-1
                    ${data.color === 'green' ? 'text-[var(--green-color)]' : 'text-[var(--red-color)]'} 
                `}
            >
                <span className='flex'>
                    {!data.isString && (data.status === 'up' ? '+' : '-')} 
                    {data.isString ? Numbers(data.msg, i18n.language) : `${Numbers(data.percentageChange, i18n.language)}%`}
                </span>
                {data.isString ? <CurrencyImage width={'w-3'} color='green' /> : t('comparedLastMonth')}
            </p>

        </div>

    </React.Fragment>

}
