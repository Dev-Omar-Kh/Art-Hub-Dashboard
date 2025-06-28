import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { CiFileOn } from 'react-icons/ci';
import { FaRegFileLines } from 'react-icons/fa6';
import { MdOutlineUploadFile } from 'react-icons/md';

export default function ImgInput({width = 'w-full', id, label, onChange, onBlur, value, ValidationError}) {

    const {t} = useTranslation();

    const [fileValue, setFileValue] = useState(null);
    const [fileNames, setFileNames] = useState([]);

    useEffect(() => {

        if (value) {

            setFileValue(value);

            if (value.name) {
                setFileNames([value.name]);
            } 
            else if (Array.isArray(value)) {
                setFileNames(value.map(file => file.name));
            }

        }

    }, [value]);

    const handleFileChange = (event) => {

        const files = Array.from(event.target.files);

        if (files.length > 0) {
            setFileValue(files.length === 1 ? files[0] : files);
            setFileNames(files.map(file => file.name));
        }

        if (onChange) {
            onChange(event);
        }

    };

    return <React.Fragment>

        <div className={`relative ${width} flex flex-col gap-1 group`}>

            {ValidationError && <div className='w-full flex justify-end'>
                <p className='text-[0.6875rem] text-[var(--red-color)]'>* {ValidationError}</p>
            </div>}

            {fileNames.length > 0 && <div className='w-full flex items-center gap-2.5 overflow-x-auto hidden-scroll'>
                {fileNames.map((name, index) => (
                    <div className='w-fit px-2.5 py-1 flex items-center gap-1 rounded-md bg-[var(--light-gray-color)]' key={index}>
                        <FaRegFileLines className='text-base text-[var(--gray-color)]' />
                        <p className='text-sm font-medium text-[var(--gray-color)] whitespace-nowrap'>{name}</p>
                    </div>
                ))}
            </div>}

            <label 
                htmlFor={id} 
                className={`
                    w-full p-2.5 bg-[var(--white-color)] rounded-md border-2 border-dashed
                    flex items-center justify-center duration-300 cursor-pointer
                    ${fileValue ? 'border-[var(--dark-blue-color)]' : 'border-[var(--gray-color)]'}
                `}
            >

                <div 
                    className={`
                        w-full flex items-center justify-center gap-2.5
                        duration-300
                        ${fileValue ? 'text-[var(--dark-blue-color)]' : 'text-[var(--gray-color)]'}
                    `}
                >
                    <MdOutlineUploadFile className='text-2xl'/>
                    <p className='text-lg font-medium'>{t(label)}</p>
                </div>

                <input 
                    type="file" id={id} className='hidden' multiple
                    onChange={handleFileChange} onBlur={onBlur}
                />

            </label>

        </div>

    </React.Fragment>

}
