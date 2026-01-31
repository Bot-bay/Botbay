import React, { useState } from 'react';
import { IoTrashSharp } from "react-icons/io5";
import { PiPencilSimple } from "react-icons/pi";
import { PiPencilSimpleSlash } from "react-icons/pi";

function PartItem({ part, onRowClick }) {
    const [imgLoaded, setImgLoaded] = useState(true);

    return (
        <div className="d-partitem" onClick={() => onRowClick(part)}>
            <div style={{ width: '15%', display:'flex', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
                {part.icon && imgLoaded && 
                    <img src={part.icon} style={{ width: '40px', height: '40px', marginRight:'15px' }} alt={`${part.name} icon`} onError={() => setImgLoaded(false)}/>
                }
                {part.manufacturerId}
            </div>
            <div style={{ width: '50%' }}>{part.name}</div>
            <div style={{ width: '15%' }}>{part.quantity}</div>
            <div style={{ width: '15%' }}>{part.needed || 0}</div>
            <div style={{ width: '5%', height: '100%' }}><div className={part.editable ? "d-partitem-iconbutton1" : ""}>{part.editable ? <PiPencilSimple /> : <PiPencilSimpleSlash />}</div></div>
            <div style={{ width: '5%', height: '100%' }}><div className="d-partitem-iconbutton2"><IoTrashSharp /></div></div>
        </div>
    );
}

export default PartItem;
