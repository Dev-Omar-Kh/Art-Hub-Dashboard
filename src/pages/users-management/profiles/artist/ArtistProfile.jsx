import React from 'react'
import { ROUTES } from '../../../../constants/routes';
import MainTitle from '../../../../components/Titles/MainTitle';
import PathSteps from '../../../../components/path-steps/PathSteps';
import { PiExportBold } from 'react-icons/pi';
import { IoBanSharp } from 'react-icons/io5';
import ArtistData from './ArtistData';

export default function ArtistProfile() {

    const profileButtons = [
        {id: 1, title: 'exportDataWord', icon: <PiExportBold/>, color: 'var(--white-color)', bgColor: 'var(--dark-blue-color)'},
        {id: 2, title: 'banWord', icon: <IoBanSharp />, color: 'var(--red-color)', bgColor: 'var(--light-red-color)'},
    ];

    const paths = [
        {id: 1, title: 'usersManageWord', url: ROUTES.USERS_ROUTE},
        {id: 2, title: 'artistProfileWord'},
    ];

    return <React.Fragment>

        <section className='w-full flex flex-col gap-10'>

            <MainTitle title={'artistProfileWord'} slogan={'artistProfileSlogan'} buttons={profileButtons} />

            <PathSteps paths={paths} />

            <ArtistData />

        </section>

    </React.Fragment>

}