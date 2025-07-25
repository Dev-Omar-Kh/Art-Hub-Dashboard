import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Button = ({ text, content, onClick, disabled, current }) => {

    return <React.Fragment>
        
        <button
            className={`
                h-10 w-10 rounded-md 
                ${current
                    ? 'bg-[var(--dark-blue-color)] text-[var(--white-color)]'
                    : 'bg-[var(--white-color)]'} 
                flex items-center justify-center gap-1
                ${disabled ? 'cursor-not-allowed text-[var(--gray-color)]' : 'cursor-pointer text-[var(--dark-blue-color)]'} ${text}
            `}
            onClick={disabled ? undefined : onClick}
        >
            {content}
        </button>

    </React.Fragment>

};

export default function PaginationList({data, setCurrentPage, currentPage}) {

    const totalPages = data?.pages;

    const getPageList = () => {

        const pages = [];
    
        if (totalPages <= 7) {

            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

            return pages;

        }
    
        if (currentPage <= 4) {

            for (let i = 1; i <= 5; i++) {
                pages.push(i);
            }

            pages.push('...');
            pages.push(totalPages);

        } else if (currentPage >= totalPages - 3) {

            pages.push(1);
            pages.push('...');

            for (let i = totalPages - 4; i <= totalPages; i++) {
                pages.push(i);
            }

        } else {

            pages.push(1);
            pages.push('...');
            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);
            pages.push('...');
            pages.push(totalPages);

        }

        return pages;

    };

    const pageList = getPageList();

    return <React.Fragment>

        {data && <div className="max-w-full flex flex-wrap justify-center items-center gap-1.5">

            <Button
                text="text-xl rtl:rotate-180"
                content={<IoIosArrowBack />}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
            />

            {pageList.map((item, index) =>
                item === '...' ? (
                    <Button key={`dot-${index}`} content={'...'} text="text-base font-medium" />
                ) : (
                    <Button
                        key={item}
                        text="text-base font-medium"
                        current={currentPage === item}
                        content={item}
                        onClick={() => setCurrentPage(item)}
                    />
                )
            )}

            <Button
                text="text-xl rtl:rotate-180"
                content={<IoIosArrowForward />}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
            />

        </div>}

    </React.Fragment>
}
