import React from 'react';
import Numbers from '../../../../../hooks/useConvertNumber';
import { useTranslation } from 'react-i18next';
import ElementBox from '../../../../../components/elements-box/ElementBox';

const clientLogData = [
    {
        id: '1234',
        icon: '🛒',
        isOrder: true,
        title: 'طلب جديد',
        des: 'تم إنشاء طلب جديد بقيمة 250 ريال',
        date: '15-6-2025 14:30',
        status: 'completedWord'
    },
    {
        id: '1451',
        icon: '⭐',
        isOrder: false,
        title: 'تقييم جديد',
        des: 'تم إرسال تقييم 5 نجوم للمنتج',
        date: '15-6-2025 16:45',
        status: 'newWord'
    },
    {
        id: '2224',
        icon: '🔐',
        isOrder: false,
        title: 'تسجيل دخول',
        des: 'تم تسجيل الدخول من الرياض',
        date: '14-6-2025 09:15',
        status: 'infoWord'
    },
    {
        id: '12300',
        icon: '🛒',
        isOrder: true,
        title: 'طلب جديد',
        des: 'تم إنشاء طلب جديد بقيمة 450 ريال',
        date: '11-6-2025 17:40',
        status: 'rejectedWord'
    },
    {
        id: '3870',
        icon: '👤',
        isOrder: false,
        title: 'تحديث الملف الشخصي',
        des: 'تم تحديث معلومات الملف الشخصي',
        date: '11-6-2025 15:30',
        status: 'infoWord'
    }
];

export default function ArtistLogs() {

    const {i18n} = useTranslation();

    return <React.Fragment>

        <div className='w-full flex flex-col gap-2.5'>

            {clientLogData.map(notification => (
                <div 
                    key={notification.id} 
                    className='
                        w-full p-2.5 flex items-center justify-between gap-5 rounded-md bg-[var(--light-gray-color)]
                        max-[465px]:flex-col max-[465px]:items-start
                    '
                >

                    <div className='flex items-center gap-2.5 max-[465px]:flex-col max-[465px]:items-start'>

                        <div 
                            className='
                                w-10 h-10 min-w-10 min-h-10 flex items-center justify-center rounded-full bg-[var(--white-color)] 
                                border border-[var(--mid-gray-color)]
                            '
                        >
                            {notification.icon}
                        </div>

                        <div className='flex flex-col gap-1'>

                            <h3 className='text-lg font-bold text-[var(--dark-blue-color)]'>
                                {notification.title + ' '}
                                {notification.isOrder && `# ${Numbers(notification.id, i18n.language, true)}`}
                            </h3>

                            <p className='text-base font-medium text-[var(--gray-color)]'>{notification.des}</p>

                            <p className='text-base font-medium text-[var(--gray-color)]'>{notification.date}</p>

                        </div>

                    </div>

                    <div>
                        <ElementBox title={notification.status} 
                            bgColor={
                                notification.status === 'completedWord' ? 'var(--light-green-color)'
                                // : notification.status === 'infoWord' ? 'var(--mid-blue-color)'
                                : notification.status === 'progressWord' ? 'var(--light-yellow-color)'
                                : notification.status === 'rejectedWord' ? 'var(--light-red-color)'
                                : 'var(--sky-blue-color)'
                            } 
                            color={
                                notification.status === 'completedWord' ? 'var(--green-color)'
                                // : notification.status === 'infoWord' ? 'var(--dark-blue-color)'
                                : notification.status === 'progressWord' ? 'var(--yellow-color)'
                                : notification.status === 'rejectedWord' ? 'var(--red-color)'
                                : 'var(--dark-blue-color)'
                            } 
                        />
                    </div>

                </div>
            ))}

        </div>

    </React.Fragment>

}
