import React, { useState } from 'react';
import '../styles/sharedstyles.css'
import '../styles/dashboard.css'
import { useMediaQuery } from 'react-responsive'

import HomePageDesktop from './sub-pages/desktop/dashboardHome';
import HomePagePhone from './sub-pages/phone/dashboardHome';

import PartsPageDesktop from './sub-pages/desktop/dashboardParts';
import PartsPagePhone from './sub-pages/phone/dashboardParts';

import PlanPageDesktop from './sub-pages/desktop/dashboardPlan';
import PlanPagePhone from './sub-pages/phone/dashboardPlan';

import PackPageDesktop from './sub-pages/desktop/dashboardPack';
import PackPagePhone from './sub-pages/phone/dashboardPack';

import BatteryPageDesktop from './sub-pages/desktop/dashboardBattery';
import BatteryPagePhone from './sub-pages/phone/dashboardBattery';

import SettingsPageDesktop from './sub-pages/desktop/dashboardSettings';
import SettingsPagePhone from './sub-pages/phone/dashboardSettings';

import sidebarLogo from '../images/LogoTrans.png';

function Dashboard(){
    const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });

    // There are 6 pages, home, parts, plan, pack, batteries, and settings, index tells which page we are currently on
    const [pageIndex, setPageIndex] = React.useState(0);

    // Returns the correct page element to display, depending on whether user is on phone or desktop
    const renderPageContent = () => {
        if(isDesktop){
            switch(pageIndex) {
                case 0:
                    return <HomePageDesktop />;
                case 1:
                    return <PartsPageDesktop />;
                case 2:
                    return <PlanPageDesktop />;
                case 3:
                    return <PackPageDesktop />;
                case 4:
                    return <BatteryPageDesktop />;
                case 5:
                    return <SettingsPageDesktop />;
                default:
                    return <HomePageDesktop />;
            }
        }else{
            switch(pageIndex) {
                case 0:
                    return <HomePagePhone />;
                case 1:
                    return <PartsPagePhone />;
                case 2:
                    return <PlanPagePhone />;
                case 3:
                    return <PackPagePhone />;
                case 4:
                    return <BatteryPagePhone />;
                case 5:
                    return <SettingsPagePhone />;
                default:
                    return <HomePagePhone />;
            }
        }
    };

    return (
        <div className="dashboardscreencontainer">
            {isDesktop ? (
                <>
                <div className="sidebar">
                    <img className='sidebarlogo' src={sidebarLogo} alt="logo"></img>
                </div>
                
                </>
            ) : (
                <>
                </>
            )}
            <div className="dashboardcontainer">
                {renderPageContent()}
            </div>
        </div>
    );
}



export default Dashboard;