import React from 'react'
import { useTranslation } from 'react-i18next'
import Numbers from '../../../services/convertNum';

export default function Statistics({statisticsData}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div className='w-full grid grid-cols-3 gap-5 max-[720px]:grid-cols-1'>

            {statisticsData.map(state => (
                <div 
                    key={state.id} 
                    className='
                        p-5 rounded-2xl bg-[var(--white-color)] 
                        flex flex-col gap-2.5 shadow-[0_0px_10px_var(--shadow-black-color)]'
                >

                    <div className='w-full flex flex-col gap-1'>
                        <h3 className='text-xl font-medium text-[var(--black-color)]'>{t(state.title)}</h3>
                        <p className='text-3xl font-bold text-[var(--dark-blue-color)]'>
                            {Numbers(state.value, i18n.language)}
                        </p>
                    </div>

                    <p 
                        className={`
                            text-sm font-medium flex items-center gap-1
                            ${state.color === 'green' ? 'text-[var(--green-color)]' : 'text-[var(--red-color)]'} 
                        `}
                    >
                        <span className='flex'>
                            {state.status === 'up' ? '+' : '-'} 
                            {Numbers(state.percentageChange, i18n.language)}%
                        </span>
                        {t('comparedLastMonth')}
                    </p>

                </div>
            ))}

        </div>

    </React.Fragment>

}
