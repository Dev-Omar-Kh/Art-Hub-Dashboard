import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Animations from '../../../animations/Animations';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import { PiWarningCircle } from "react-icons/pi";

export default function ListInput({id, label, placeHolder, options, onSelect, onChange, onBlur, value, ValidationError, disabled}) {

    const {t, i18n} = useTranslation();

    // ======= handle-selected-list ======= //

    const [searchTerm, setSearchTerm] = useState(value?.label || '');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setSearchTerm(value?.label || '');
    }, [value]);

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setFilteredOptions(options.filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        ));
        setHighlightedIndex(-1);
        if (onChange) onChange(e);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option.label);
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        if (onSelect) onSelect(option);
        if (onChange) onChange({ target: { id, value: option } });
    };

    const handleKeyDown = (e) => {
        if (!isDropdownOpen) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prevIndex => 
                    prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prevIndex => 
                    prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
                    handleOptionClick(filteredOptions[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsDropdownOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    const handleClickOutside = (e) => {
        if (
            inputRef.current && !inputRef.current.contains(e.target) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target)
        ) {
            setIsDropdownOpen(false);
            setHighlightedIndex(-1);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <React.Fragment>

        <div className={`relative w-full flex flex-col gap-1 group ${disabled ? 'opacity-50' : 'opacity-100'}`}>

            <label 
                className={`
                    flex items-center justify-between gap-1.5 text-base font-medium 
                    ${searchTerm ? 'text-[var(--dark-blue-color)]' : 'text-[var(--gray-color)]'}
                    duration-300 group-focus-within:text-[var(--dark-blue-color)]
                `} 
                htmlFor={id}
            >
                <p>{t(label)} :</p>
                {ValidationError && <p className='text-[0.6875rem] text-[var(--red-color)]'>* {ValidationError}</p>}
            </label>

            <input id={id}
                disabled={disabled}
                type="text"
                value={t(searchTerm)}
                ref={inputRef}
                autoComplete='off'
                className={`
                    w-full h-10 px-2.5 rounded-md border border-solid 
                    ${i18n.language === 'en' ? 'pr-10.5' : 'pl-10.5'} placeholder:text-[var(--gray-color)]
                    ${searchTerm ? 'border-[var(--dark-blue-color)]' : 'border-[var(--gray-color)]'}
                    outline-0 duration-300 focus:border-[var(--dark-blue-color)] text-base font-medium text-[var(--black-color)]
                `}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={onBlur}
                onKeyDown={handleKeyDown}
                placeholder={t(placeHolder)}
            />

            {/* ====== arrow ====== */}

            <div className={`
                absolute bottom-0 end-2.5 h-10 flex items-center justify-center 
            `}>
                <IoIosArrowForward 
                    className={`
                        text-2xl duration-300 
                        ${i18n.language === 'en' ? 'group-focus-within:rotate-90' : 'group-focus-within:rotate-90 rotate-180'}
                        group-focus-within:text-[var(--dark-blue-color)]
                        ${searchTerm ? 'text-[var(--dark-blue-color)]' : 'text-[var(--gray-color)]'}
                    `} 
                />
            </div>

            {/* ====== list-options ====== */}

            <AnimatePresence>

                {isDropdownOpen && (

                    <motion.div 
                        ref={dropdownRef}
                        variants={Animations.displayList}
                        initial='hidden' animate='visible' exit='exit'
                        className='
                            absolute list-position w-full max-h-48
                            rounded-md border border-solid border-[var(--mid-gray-color)] 
                            shadow-[0_0px_10px_var(--shadow-black-color)] bg-[var(--white-color)] overflow-hidden z-40
                        '
                    >

                        {filteredOptions.length > 0 ? 
                            <ul className="w-full max-h-48 overflow-auto">

                                {filteredOptions.map((option, index) => (

                                    <li 
                                        key={option.value || index}
                                        onClick={() => handleOptionClick(option)}
                                        onMouseEnter={() => setHighlightedIndex(index)}
                                        className={`
                                            w-full p-2.5 border-b border-solid border-[var(--mid-gray-color)] cursor-pointer
                                            text-base text-[var(--gray-color)] last:border-b-0
                                            ${value && value.value === option.value ? 'bg-[var(--dark-blue-color)] text-[var(--white-color)]' : ''}
                                            ${highlightedIndex === index ? 'bg-[var(--dark-blue-color)] text-[var(--white-color)]' : ''}
                                            duration-300 hover:bg-[var(--dark-blue-color)] hover:text-[var(--white-color)]
                                        `}
                                    >
                                        {t(option.label)}
                                    </li>

                                ))}

                            </ul> 
                            : 
                            <div 
                                className='
                                    w-full p-2.5 border-b border-solid border-[var(--mid-gray-color)]
                                    flex items-center justify-center gap-2.5 
                                    cursor-pointer text-base text-[var(--gray-color)]
                                '
                            >
                                <PiWarningCircle className='text-2xl' />
                                <p>{t('noOptionsMatched')}</p>
                            </div>
                        }

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    </React.Fragment>
}