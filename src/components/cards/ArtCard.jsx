import React from 'react'
import { useTranslation } from 'react-i18next';
import Numbers from '../../hooks/useConvertNumber';

export default function ArtCard({order, children, date = true, comment = false, isArtist = false}) {

    const { t, i18n } = useTranslation();

    return <React.Fragment>

        <div 
            className='
                w-full p-2.5 flex items-center justify-between 
                rounded-md bg-[var(--light-gray-color)] 
                max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-5
            '
        >

            <div className='flex flex-col gap-1'>

                <h3 className='text-lg font-semibold text-[var(--dark-blue-color)]'>{t(order.   title)}</h3>

                <p className='text-base font-medium text-[var(--gray-color)] flex items-center gap-1'>
                    <span className='text-[var(--dark-blue-color)]'>{t(isArtist ? 'theClientWord' : 'theArtistWord')}: </span>
                    {t(isArtist ? order.client : order.artist)}
                </p>

                {date && <p className='text-base font-medium text-[var(--gray-color)]'>
                    {order.date.split('-').map(num => Numbers(num, i18n.language, true)).join(' - ')}
                </p>}

                {comment && <p className='text-sm font-medium text-[var(--dark-blue-color)]'>
                    {t(order.comment)}
                </p>}

            </div>

            {children}

        </div>

    </React.Fragment>

}
