import React from 'react'
import { useTranslation } from 'react-i18next'
import WorkCard from '../../../../../components/cards/WorkCard';

export default function ArtistWorks() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5'>

            <h3 className='text-2xl font-semibold text-[var(--dark-blue-color)]'>{t('allArtistWorksWord')}</h3>

            <div className='w-full grid grid-cols-3 gap-2.5 max-[1110px]:grid-cols-2 max-[590px]:grid-cols-1'>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(pro => <WorkCard key={pro} />)}

            </div>

        </div>

    </React.Fragment>

}
