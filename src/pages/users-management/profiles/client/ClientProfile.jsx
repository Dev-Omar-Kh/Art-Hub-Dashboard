import React, { useState } from 'react'
import MainTitle from '../../../../components/Titles/MainTitle'
import { LuMessageSquareText } from 'react-icons/lu'
import { IoBanSharp } from 'react-icons/io5'
import { ROUTES } from '../../../../constants/routes'
import ClientData from './ClientData'
import PathSteps from '../../../../components/path-steps/PathSteps'
import { GoStarFill } from 'react-icons/go'
import { useParams } from 'react-router-dom'
import ProfileLayout from '../../../../layouts/ProfileLayout'
import FetchError from '../../../../components/error/FetchError'
import { useFetchQuery } from '../../../../hooks/useFetchQuery'
import { endpoints } from '../../../../constants/endPoints'
import { PiWarningOctagonBold } from 'react-icons/pi'
import { FaArrowsRotate } from 'react-icons/fa6'
import DeleteOperation from '../../../../components/delete-operation/DeleteOperation'

export default function ClientProfile() {

    const {id} = useParams();

    // ====== get-artist-data ====== //

    const {data, isLoading, isError} = useFetchQuery(['ClientData', id], `${endpoints.users.getUsers}/${id}`);
    const userData = data?.data;

    // ====== setup-buttons ====== //

    const checkActivate = userData?.isActive;
    const profileButtons = [
        {
            id: 1, 
            disabled: checkActivate,
            url: `${ROUTES.USERS_ROUTE}/${ROUTES.SEND_MESSAGE_ROUTE}/${id}/artist`,
            title: 'sendMessageWord',
            icon: <LuMessageSquareText />, 
            color: 'var(--white-color)', 
            bgColor: 'var(--dark-blue-color)'
        },
        {
            id: 2, 
            title: checkActivate ? 'banWord' : 'reactiveWord', 
            icon: checkActivate ? <PiWarningOctagonBold /> : <FaArrowsRotate />, 
            color: checkActivate ? 'var(--red-color)' : 'var(--green-color)', 
            bgColor: checkActivate ? 'var(--light-red-color)' : 'var(--light-green-color)',
            disabled: isLoading || isError,
            onClick: () => handleDeleteRow(data?.data)
        },
    ];

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'clientProfileWord'},
    ];

    const linksData = [
        // {id: 1, title: 'overViewWord', to: ''},
        {id: 2, title: 'ordersWord', to: ''},
        {id: 3, title: 'ratesWord', to: ROUTES.CLIENT_RATES_ROUTE},
        {id: 4, title: 'activityLogWord', to: ROUTES.CLIENT_ACTIVITY_LOG_ROUTE},
    ];

    // ====== delete-row ====== //
    
    const [isOpen, setIsOpen] = useState(false);
    const [openCount, setOpenCount] = useState(0);
    const [itemId, setItemId] = useState(null);
    const [itemStatus, setItemStatus] = useState(null);
    const handleDeleteRow = (item) => {
        setIsOpen(true);
        setItemId(item._id);
        setItemStatus(item.isActive);
        setOpenCount(prev => prev + 1);
    }

    return <React.Fragment>

        {isOpen && <DeleteOperation key={openCount} method={'delete'}
            icon={itemStatus ? <PiWarningOctagonBold /> : <FaArrowsRotate />} 
            iconColor={itemStatus ? 'var(--red-color)' : 'var(--green-color)'}
            title={itemStatus ? 'deleteUserTitle' : 'reactiveUserTitle'} msg={itemStatus ? 'deleteUserMsg' : 'reactiveUserMsg'} 
            successMsg={itemStatus ? 'banUserSuccessMsg' : 'activeUserSuccess'} 
            errorMsg={itemStatus ? 'banUserErrorMsg' : 'activeUserErrorMsg'} goTo={ROUTES.USERS_ROUTE}
            setIsOpen={setIsOpen} endPoint={`${endpoints.users.getUsers}/${itemId}/block`} tableName={'users'}
        />}

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'clientProfileWord'} slogan={'clientProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            {userData?.role === 'artist' && <FetchError className='w-full h-fit' />}

            {userData?.role !== 'artist' && <React.Fragment>
                <ClientData userData={userData} isError={isError} isLoading={isLoading} />
                <ProfileLayout linksData={linksData} />
            </React.Fragment>}

        </section>

    </React.Fragment>

}
