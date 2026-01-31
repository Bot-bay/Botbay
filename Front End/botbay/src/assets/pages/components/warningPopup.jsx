import React, { useState } from 'react';
import Blocker from './blocker';

import '../../styles/status.css'

function WarningPopup({message, complete, close}) {
    return (
        <>
            <div className='s-popup'>
                <p id="s-popup-warning-title">Warning</p>
                <p>{message}</p>
                <p>Are you sure you want to continue?</p>
                <div className='leftcontainer'>
                    <div className='halfcontainer'><button id="s-popup-warning-button-no" onClick={close}>No</button></div>
                    <div className='halfcontainer'><button id="s-popup-warning-button-yes" onClick={complete}>Yes</button></div>
                </div>
            </div>
            <Blocker></Blocker>
        </>
    );
}


export default WarningPopup;
