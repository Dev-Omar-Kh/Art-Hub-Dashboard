import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ElementBox({title, bgColor, color, shadow = false}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex items-center justify-center'>
            <p 
                className={`w-fit py-1 px-2.5 rounded-4xl ${ shadow ? 'shadow-[0_0px_10px_var(--shadow-black-color)]' : ''}`} 
                style={{backgroundColor: bgColor, color: color}}
            >
                {t(title)}
            </p>
        </div>

    </React.Fragment>

}
