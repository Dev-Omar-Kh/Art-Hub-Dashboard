import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CustomBtn({
    title, color='var(--sky-blue-color)', hover=true, hoverColor='var(--mid-blue-color)', icon=null,
    textColor='var(--gray-color)', textHoverColor='var(--dark-blue-color)', center=false, isActive = false
}) {

    const {t} = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    const getBackgroundColor = () => {
        if (isActive) return 'var(--mid-blue-color)';
        if (hover && isHovered) return hoverColor;
        return color;
    };

    const getTextColor = () => {
        if (isActive) return 'var(--dark-blue-color)';
        if (hover && isHovered) return textHoverColor;
        return textColor;
    };

    return <React.Fragment>
        <div 
            className={`
                group w-full px-5 py-2.5 rounded-4xl duration-300 cursor-pointer flex items-center gap-2.5
                ${center ? 'justify-center': 'justify-start'}
            `}
            style={{backgroundColor: getBackgroundColor(), color: getTextColor()}}
            onMouseEnter={() => hover && setIsHovered(true)}
            onMouseLeave={() => hover && setIsHovered(false)}
        >
            {icon && <span className='text-xl'>{icon}</span>}
            <p className={`font-semibold duration-300 transition-transform`}>{t(title)}</p>
        </div>
    </React.Fragment>

}
