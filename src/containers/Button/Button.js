import React from 'react';
import './Button.css';

const button = (props) => (
   <button type="button" disabled={props.disabled} className="addBtn" onClick={props.addmoreBox}>+</button>

);

export default button;