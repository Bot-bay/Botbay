import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; 
import signUpLogo from '../images/BlankLogo.png';

import '../styles/signupstyles.css';
import '../styles/sharedstyles.css';

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="screencontainer">
      <div className="centercontainer">
        <div className="contentcontainer">
          <img className="signuplogo" src={signUpLogo} alt="Logo" />
          <div className="inputcontainer">
            <p className="inputheader">Email:</p>
            <input className="signupinput" type="email" placeholder="email@example.com" />
            <div className="bottomcontainer">
              <p className="bottomtext">Input your email for a reset link.</p>
              <p id="noticetext" style={{color: "transparent", fontSize: "0rem"}}>Hello</p>
            </div>
            <div className="bottomcontainer">
              <button className="signupbutton">Reset Password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;