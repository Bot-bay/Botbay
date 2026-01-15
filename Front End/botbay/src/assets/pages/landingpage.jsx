import React from 'react';
import { useMediaQuery } from 'react-responsive'
import '../styles/landingpage.css'
import '../styles/sharedstyles.css'
import { switchToPage } from '../scripts/navigation.js';

import multiDeviceIcon from '../images/multideviceicon.png';
import listIcon from '../images/listicon.png';
import bookIcon from '../images/bookicon.png';
import navlogo from '../images/BlankLogo.png';

function LandingPage() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });
  const goToSignUp = switchToPage('/signup');
  const goToSignIn = switchToPage('/signin');

  return (
    <div className="screencontainer">
      {isDesktop ? (
        <>
          <div className="navbar">
            <div className="halfcontainer">
              <div className="leftcontainer">
                <img className="navlogo" src={navlogo}></img>
              </div>
            </div>
            <div className="halfcontainer">
              <div className="rightcontainer">
                <div className="navtexthelper">
                  <p className="navunderlinebutton">Home</p>
                  <p className="navunderlinebutton">About</p>
                  <button className="navbutton" onClick={goToSignIn}>Sign In</button>
                </div>
              </div>
            </div>
          </div>
          <div className="herocontainer">
            <div className="halfcontainer">
              <div className="vertical33container">
                <p className="herotitle">Keep Track of Your Team’s Parts With Ease</p>
              </div>
              <div className="vertical34container">
                <div className="halfcontainer">
                  <div className="leftcontainer">
                    <ul>
                      <li>Multi-device syncing</li>
                      <li>Thorough interface</li>
                      <li>Keeps you organized</li>
                      <li>Useful utilities for all teams</li>
                    </ul>
                  </div>      
                </div>
                <div className="halfcontainer">
                  <div className="rowcontainer">
                    <img className="heroicon" src={multiDeviceIcon}></img>
                    <img className="heroicon" src={listIcon}></img>
                    <img className="heroicon" src={bookIcon}></img>
                  </div>
                </div>
              </div>
              <div className="vertical33container">
                <div className="evenspreadflex">
                  <button className="herobutton" onClick={goToSignUp}>Sign Up</button>
                  <button className="herobutton">Try it Out</button>
                </div>
              </div>
            </div>
            <div className="halfcontainer">

            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar">
            <div className="halfcontainer">
              <img className="navlogo" src={navlogo}></img>
            </div>
            <div className="halfcontainer">
              <div className="navtexthelper">
                <p className="navunderlinebutton">Home</p>
                <p className="navunderlinebutton">About</p>
                <button className="navbutton">Sign In</button>
              </div>
            </div>
          </div>
          <div className="herocontainer">
                <center>
                  <p className="herotitle">Keep Track of Your Team’s Parts With Ease</p>
                  <ul className="herolist">
                    <li>Multi-device syncing</li>
                    <li>Thorough interface</li>
                    <li>Keeps you organized</li>
                    <li>Useful utilities for all teams</li>
                  </ul>
                </center>
                <div className="rowcontainer">
                  <img className="heroicon" src={multiDeviceIcon}></img>
                  <img className="heroicon" src={listIcon}></img>
                  <img className="heroicon" src={bookIcon}></img>
                </div>
                <div className="evenspreadflex">
                  <button className="herobutton">Sign Up</button>
                  <button className="herobutton">Try it Out</button>
                </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;