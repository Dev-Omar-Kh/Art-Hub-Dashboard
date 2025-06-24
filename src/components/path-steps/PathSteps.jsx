import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function PathSteps({paths = []}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex flex-wrap items-center gap-1'>

            {paths.map((path, idx) => (

                <div className='flex items-center gap-1' key={path.id}>

                    {path.url
                        ? <Link to={path.url} className='text-[var(--gray-color)] font-medium'>{t(path.title)}</Link>
                        : <p className='text-[var(--dark-blue-color)] font-medium'>{t(path.title)}</p>
                    }

                    {idx < (paths.length - 1) && <IoIosArrowBack className='text-base text-[var(--gray-color)]' />}

                </div>

            ))}

        </div>

    </React.Fragment>

}
