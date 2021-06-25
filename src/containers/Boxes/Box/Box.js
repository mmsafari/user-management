import React from 'react';
import './Box.css';

const boxes = (props) => (
  <div
    className={props.classStyle}
    draggable={props.draggable}
    onDragStart={props.onDragStart({ id: props.box.id })}
    onDragOver={props.onDragOver({ id: props.box.id })}
    onDrop={props.onDrop({ id: props.box.id })}
  >
    <span onClick={props.onRemove} className="fa fa-trash-o" />
    <div className="content">{props.box.name}</div>
  </div>
);


export default boxes;
