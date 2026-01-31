import React from 'react';
import ReactDOM from 'react-dom';

function Blocker() {
    return ReactDOM.createPortal(
        <div 
            style={{
                background: "rgba(10, 10, 10, 0.35)",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 10001
            }}
        />,
        document.body
    );
}

export default Blocker;
