import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

export default function Textarea({id, label, placeHolder, value, onChange, onBlur, ValidationError}) {

    const {t} = useTranslation();

    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
        setHasValue(value && value.trim() !== '');
    }, [value]);

    const handleInputChange = (e) => {
        setHasValue(e.target.value.trim() !== '');
        if (onChange) onChange(e);
    };

    const handleBlur = (e) => {
        if (onBlur) onBlur(e);
    };

    return <React.Fragment>

        <div className={`relative w-full flex flex-col gap-1 group`}>

            <label 
                className={`
                    flex items-center justify-between gap-1.5 text-base font-medium 
                    ${hasValue ? 'text-[var(--dark-blue-color)]' : 'text-[var(--gray-color)]'} 
                    duration-300 group-focus-within:text-[var(--dark-blue-color)]
                `} 
                htmlFor={id}
            >
                <p>{t(label)} :</p>
                {ValidationError && <p className='text-[0.6875rem] text-[var(--red-color)]'>* {ValidationError}</p>}
            </label>

            <textarea 
                id={id} placeholder={t(placeHolder)}
                className={`
                    w-full field-sizing-content min-h-28 max-h-96 p-2.5 rounded-md border border-solid resize-none
                    ${hasValue ? 'border-[var(--dark-blue-color)]' : 'border-[var(--gray-color)]'} 
                    placeholder:text-[var(--gray-color)]
                    outline-0 duration-300 focus:border-[var(--dark-blue-color)] text-base font-medium text-[var(--black-color)]
                `}
                autoComplete='off'
                value={value} onChange={handleInputChange} onBlur={handleBlur} 
            ></textarea>

        </div>

    </React.Fragment>


}
