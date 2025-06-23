import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoSearchOutline } from 'react-icons/io5'

export default function SearchInput({id, placeholder, onSearch}) {

    const {t} = useTranslation();

    const handleInputChange = (e) => {
        if (onSearch) onSearch(e.target.value);
    };

    return <React.Fragment>

        <form 
            onSubmit={(e) => e.preventDefault()}
            className='
                w-full h-10 flex items-center justify-between rounded-md 
                bg-[var(--white-color)] border border-[var(--gray-color)]
                duration-300 group focus-within:border-[var(--dark-blue-color)]
            '
        >

            <input 
                id={id} type="text" 
                onChange={handleInputChange}
                className='
                    peer w-full h-full px-2.5 text-lg text-[var(--dark-blue-color)] 
                    placeholder:text-[var(--gray-color)] outline-0
                ' 
                placeholder={t(placeholder)}
            />

            <div className='
                px-2.5 text-2xl text-[var(--gray-color)] duration-300 peer-focus:text-[var(--dark-blue-color)]
                cursor-pointer
            '>
                <IoSearchOutline />
            </div>

        </form>

    </React.Fragment>

}
