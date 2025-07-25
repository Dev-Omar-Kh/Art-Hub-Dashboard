import React from 'react';
import { useTranslation } from 'react-i18next';
import TableLoading from './table-status/TableLoading';
import TableError from './table-status/TableError';
import wrongIcon from '../../assets/jsons/wrong.json';
import warningIcon from '../../assets/jsons/warning.json';

export default function Table({columns, data, renderRow, onActionClick, actions, tHeadColor, isLoading, isError, emptyMsg}) {

    const { t, i18n } = useTranslation();

    return <React.Fragment>

        <div className='w-full overflow-auto hidden-scroll'>

            <table className='w-full border-collapse'>

                <thead style={tHeadColor ? { backgroundColor: tHeadColor } : {}}>

                    <tr className='text-base text-[var(--dark-blue-color)] text-center'>

                        {columns.map((column, index) => (
                            <th 
                                key={index}
                                className={`
                                    text-base font-semibold
                                    ${index !== 0 ? (i18n.language === 'en' ? 'border-l' : 'border-r') : ''} 
                                    border-solid border-[var(--mid-gray-color)] px-2.5 py-5 whitespace-nowrap
                                `}
                            >
                                {t(column)}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {isLoading && <TableLoading />}
                    {!isLoading && isError && <TableError isRed={true} icon={wrongIcon} msg={t('errorFetchMessage')} />}

                    {!isLoading && !isError && data && data.length > 0 && (data?.map((item, index) => (

                        <tr
                            key={index}
                            className='
                                border-t border-solid border-[var(--mid-gray-color)] font-medium
                                text-base text-[var(--light-black-color)] text-center
                                duration-300 hover:bg-[var(--light-gray-color)]
                            '
                        >

                            {renderRow(item)}

                            {actions && (
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--mid-gray-color)] p-2.5 whitespace-nowrap
                                `}>
                                    {onActionClick(item)}
                                </td>
                            )}

                        </tr>

                    )))}

                    {!isLoading && !isError && data && data.length === 0 && (
                        <TableError isRed={false} icon={warningIcon} msg={emptyMsg} />
                    )}

                </tbody>

            </table>

        </div>

    </React.Fragment>

}
