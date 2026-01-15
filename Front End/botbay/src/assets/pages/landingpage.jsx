import React from 'react';
import { useMediaQuery } from 'react-responsive'
import '../styles/landingpage.css'
import '../styles/sharedstyles.css'

import multiDeviceIcon from '../images/multideviceicon.png';
import listIcon from '../images/listicon.png';
import bookIcon from '../images/bookicon.png';
import navlogo from '../images/BlankLogo.png';

function LandingPage() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });

  return (
    <div class="screencontainer">
      {isDesktop ? (
        <>
          <div class="navbar">
            <div class="halfcontainer">
              <div class="leftcontainer">
                <img class="navlogo" src={navlogo}></img>
              </div>
            </div>
            <div class="halfcontainer">
              <div class="rightcontainer">
                <div class="navtexthelper">
                  <p class="navunderlinebutton">Home</p>
                  <p class="navunderlinebutton">About</p>
                  <button class="navbutton">Sign In</button>
                </div>
              </div>
            </div>
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
                <div class="evenspreadflex">
                  <button class="herobutton">Sign Up</button>
                  <button class="herobutton">Try it Out</button>
                </div>
              </div>
            </div>
            <div class="halfcontainer">

            </div>
          </div>
        </>
      ) : (
        <>
          <div class="navbar">
            <div class="halfcontainer">
              <img class="navlogo" src={navlogo}></img>
            </div>
            <div class="halfcontainer">
              <div class="navtexthelper">
                <p class="navunderlinebutton">Home</p>
                <p class="navunderlinebutton">About</p>
                <button class="navbutton">Sign In</button>
              </div>
            </div>
          </div>
          <div class="herocontainer">
                <center>
                  <p class="herotitle">Keep Track of Your Team’s Parts With Ease</p>
                  <ul class="herolist">
                    <li>Multi-device syncing</li>
                    <li>Thorough interface</li>
                    <li>Keeps you organized</li>
                    <li>Useful utilities for all teams</li>
                  </ul>
                </center>
                <div class="rowcontainer">
                  <img class="heroicon" src={multiDeviceIcon}></img>
                  <img class="heroicon" src={listIcon}></img>
                  <img class="heroicon" src={bookIcon}></img>
                </div>
                <div class="evenspreadflex">
                  <button class="herobutton">Sign Up</button>
                  <button class="herobutton">Try it Out</button>
                </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;