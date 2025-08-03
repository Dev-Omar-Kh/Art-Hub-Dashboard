import React from 'react'
import Numbers from '../../hooks/useConvertNumber'
import { useTranslation } from 'react-i18next'
import ElementBox from '../elements-box/ElementBox';

export default function LogsCard({notification}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div 
            className='
                w-full p-2.5 flex items-center justify-between gap-5 rounded-md bg-[var(--light-gray-color)]
                max-[465px]:flex-col max-[465px]:items-start
            '
        >

            <div className='flex items-center gap-2.5 max-[465px]:flex-col max-[465px]:items-start'>

                <div 
                    className='
                        w-10 h-10 min-w-10 min-h-10 flex items-center justify-center rounded-full bg-[var(--white-color)] 
                        border border-[var(--mid-gray-color)]
                    '
                >
                    {notification.icon}
                </div>

                <div className='flex flex-col gap-1'>

                    <h3 className='text-lg font-bold text-[var(--dark-blue-color)]'>{notification.title}</h3>

                    <p className='text-base font-medium text-[var(--gray-color)]'>{notification.des}</p>

                    <p className='text-base font-medium text-[var(--gray-color)]'>
                        {`
                            ${notification.date.split('T')[0].split('-').map((item) => (
                                Numbers(item, i18n.language, true)
                            )).reverse().join(' - ')} (
                            ${notification.date.split('T')[1].split('.')[0].split(':').slice(0, -1).map((item) => (
                                Numbers(item, i18n.language, true)
                            )).reverse().join(' : ')}
                            )
                        `}
                    </p>

                </div>

            </div>

            <div>
                <ElementBox title={t(`${notification.status}Word`)} 
                    bgColor={
                        notification.status === 'completed' ? 'var(--light-green-color)'
                        // : notification.status === 'info' ? 'var(--mid-blue-color)'
                        : notification.status === 'progress' ? 'var(--light-yellow-color)'
                        : notification.status === 'rejected' ? 'var(--light-red-color)'
                        : 'var(--sky-blue-color)'
                    } 
                    color={
                        notification.status === 'completed' ? 'var(--green-color)'
                        // : notification.status === 'info' ? 'var(--dark-blue-color)'
                        : notification.status === 'progress' ? 'var(--yellow-color)'
                        : notification.status === 'rejected' ? 'var(--red-color)'
                        : 'var(--dark-blue-color)'
                    } 
                />
            </div>

        </div>

    </React.Fragment>

}
