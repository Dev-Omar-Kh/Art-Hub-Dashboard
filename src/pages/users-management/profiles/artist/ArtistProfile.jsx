import React from 'react'
import { ROUTES } from '../../../../constants/routes';
import MainTitle from '../../../../components/Titles/MainTitle';
import PathSteps from '../../../../components/path-steps/PathSteps';
import { PiExportBold } from 'react-icons/pi';

export default function ArtistProfile() {

    const profileButtons = [
        {id: 2, title: 'exportDataWord', icon: <PiExportBold/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
    ];

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'artistProfileWord'},
    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'artistProfileWord'} slogan={'artistProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

        </section>

    </React.Fragment>

}