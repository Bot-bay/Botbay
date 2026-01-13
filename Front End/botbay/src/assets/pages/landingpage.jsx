import React from 'react';
import '../styles/landingpage.css'
import '../styles/sharedstyles.css'

import multiDeviceIcon from '../images/multideviceicon.png';
import listIcon from '../images/listicon.png';
import bookIcon from '../images/bookicon.png';

function LandingPage() {
  return (
    <div class="screencontainer">
      <div class="navbar">

      </div>
      <div class="herocontainer">
        <div class="halfcontainer">
          <div class="vertical33container">
            <p class="herotitle">Keep Track of Your Team’s Parts With Ease</p>
          </div>
          <div class="vertical34container">
            <div class="halfcontainer">
              <div class="leftcontainer">
                <ul>
                  <li>Multi-device syncing</li>
                  <li>Thorough interface</li>
                  <li>Keeps you organized</li>
                  <li>Useful utilities for all teams</li>
                </ul>
              </div>      
            </div>
            <div class="halfcontainer">
              <div class="rowcontainer">
                <img class="heroicon" src={multiDeviceIcon}></img>
                <img class="heroicon" src={listIcon}></img>
                <img class="heroicon" src={bookIcon}></img>
              </div>
            </div>
          </div>
          <div class="vertical33container">
            
          </div>
        </div>
        <div class="halfcontainer">

        </div>
      </div>
    </div>
  );
}

export default LandingPage;