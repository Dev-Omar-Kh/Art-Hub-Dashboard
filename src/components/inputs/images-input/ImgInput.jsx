import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { FaRegFileLines } from 'react-icons/fa6';

export default function ImgInput({
    width = 'w-full', id, label, onChange, onBlur, value, disabled,
    ValidationError, multiple = false , asImage = false, icon
}) {

    const {t} = useTranslation();

    const [fileValue, setFileValue] = useState(null);
    const [fileNames, setFileNames] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {

        if (value) {
            setFileValue(value);

            if (value instanceof File) {
                setFileNames([value.name]);
                if (asImage && value.type && value.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        setImagePreviews([e.target.result]);
                    };
                    reader.readAsDataURL(value);
                } else if (asImage) {
                    setImagePreviews([]);
                }
            }
            else if (typeof value === 'object' && value.url) {
                setFileNames(['Current Image']);
                if (asImage) {
                    setImagePreviews([value.url]);
                }
            }
            else if (typeof value === 'string' && value.trim() !== '') {
                setFileNames(['Current Image']);
                if (asImage) {
                    setImagePreviews([value]);
                }
            }
            else if (Array.isArray(value)) {
                const names = [];
                const previews = [];

                value.forEach((item, index) => {
                    if (item instanceof File) {
                        names.push(item.name);
                        if (asImage && item.type && item.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                previews[index] = e.target.result;
                                setImagePreviews([...previews]);
                            };
                            reader.readAsDataURL(item);
                        }
                    } else if (typeof item === 'string') {
                        names.push('Current Image');
                        if (asImage) {
                            previews[index] = item;
                        }
                    } else if (typeof item === 'object' && item.url) {
                        names.push('Current Image');
                        if (asImage) {
                            previews[index] = item.url;
                        }
                    }
                });

                setFileNames(names);
                if (asImage && previews.length > 0) {
                    setImagePreviews(previews);
                }
            }
        } else {
            setFileValue(null);
            setFileNames([]);
            setImagePreviews([]);
        }

    }, [value, asImage]);

    const handleFileChange = (event) => {

        const files = Array.from(event.target.files);

        if (files.length > 0) {

            setFileValue(files.length === 1 ? files[0] : files);
            setFileNames(files.map(file => file.name));

            if (asImage) {
                const promises = files.map(file => {
                    return new Promise((resolve) => {
                        if (file.type && file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (e) => resolve(e.target.result);
                            reader.readAsDataURL(file);
                        } else {
                            resolve(null);
                        }
                    });
                });
                
                Promise.all(promises).then(previews => {
                    setImagePreviews(previews);
                });
            }

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
                    <div className='' key={index}>
                        {asImage && imagePreviews[index] ? (
                            <div className='relative'>
                                <img 
                                    src={imagePreviews[index]} 
                                    alt={name} 
                                    className='w-16 h-16 object-cover rounded-md border-2 border-[var(--light-gray-color)]'
                                />
                            </div>
                        ) : (
                            <div className='w-fit px-2.5 py-1 flex items-center gap-1 rounded-md bg-[var(--light-gray-color)]'>
                                <FaRegFileLines className='text-base text-[var(--gray-color)]' />
                                <p className='text-sm font-medium text-[var(--gray-color)] whitespace-nowrap'>{name}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>}

            <label 
                htmlFor={id} 
                className={`
                    w-full p-2.5 bg-[var(--white-color)] rounded-md border-2 border-dashed
                    flex items-center justify-center duration-300 cursor-pointer
                    ${fileValue ? 'border-[var(--dark-blue-color)]' : 'border-[var(--gray-color)]'}
                    ${disabled ? 'opacity-50' : 'opacity-100'}
                `}
            >

                <div 
                    className={`
                        w-full flex items-center justify-center gap-2.5
                        duration-300
                        ${fileValue ? 'text-[var(--dark-blue-color)]' : 'text-[var(--gray-color)]'}
                    `}
                >
                    <div className='text-xl'>{icon}</div>
                    <p className='text-lg font-medium'>
                        {fileValue && !(typeof fileValue === 'string' || (typeof fileValue === 'object' && fileValue.url))
                            ? t('changeImageWord') || t(label)
                            : t(label)
                        }
                    </p>
                </div>

                <input 
                    type="file" 
                    id={id} disabled={disabled}
                    className='hidden' 
                    multiple={multiple}
                    onChange={handleFileChange} 
                    onBlur={onBlur}
                />

            </label>

        </div>

    </React.Fragment>

}