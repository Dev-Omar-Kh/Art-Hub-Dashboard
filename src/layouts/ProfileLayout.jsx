import React from 'react'
import TabNavigation from '../components/tab-navigation/TabNavigation'
import { Outlet } from 'react-router-dom'

export default function ProfileLayout({linksData}) {

    return <React.Fragment>

        <div className='w-full flex flex-col gap-5 bg-[var(--white-color)] rounded-2xl p-5'>

            <TabNavigation linksData={linksData} />

            <Outlet />

        </div>

    </React.Fragment>

}
