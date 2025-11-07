import React, {useState} from 'react';
import TopBar from '../components/TopBar';
import {Outlet} from 'react-router-dom';
import SideBar from '../components/SideBar'

function MainLayout() {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    return (
        <div className="relative h-screen w-screen overflow-y">
            <div className={`fixed  z-20 flex pointer-events-auto`}>
                <SideBar onOff={() => setSideBarOpen(false)} isOpen={sideBarOpen} />
                {sideBarOpen && (
                    <div
                        className="fixed w-full top-0 left-0 inset-0 h-full backdrop-blur-sm pointer-events-auto"
                        onClick={() => setSideBarOpen(false)}
                    />
                )}
            </div>

            <div className="sticky top-0"><TopBar topBarOpen={setSideBarOpen} /></div> 
            <main>
                <Outlet />
            </main>
        </div>
    );
}


export default MainLayout;
