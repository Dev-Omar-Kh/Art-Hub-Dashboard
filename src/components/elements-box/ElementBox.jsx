import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ElementBox({title, bgColor, color}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex items-center justify-center'>
            <p className='w-fit py-1 px-2.5 rounded-4xl' style={{backgroundColor: bgColor, color: color}}>
                {t(title)}
            </p>
        </div>

    </React.Fragment>

}
