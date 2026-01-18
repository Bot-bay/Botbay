import React from 'react';

import '../../../styles/dashboard.css'

function HomePageDesktop(){
    return (
        <>
        <div className='d-homepagecontainer'>
            <div className='d-titlecontainer'>
                <p>Home</p>
            </div>
            <div className='d-gridcontainer-3c2r'>
                <div className='d-griditem-2r'>
                    <p id="d-griditem-title">Members</p>
                </div>
                <div className='d-griditem-reg'>
                    <p id="d-griditem-title">Parts</p>
                </div>
                <div className='d-griditem-reg'>
                    <p id="d-griditem-title">Upcoming</p>
                </div>
                <div className='d-griditem-reg'>
                    <p id="d-griditem-title">Batteries</p>
                </div>
                <div className='d-griditem-reg'>
                    <p id="d-griditem-title">Packing List</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePageDesktop;