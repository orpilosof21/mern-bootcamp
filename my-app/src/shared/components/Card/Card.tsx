import React, { CSSProperties } from 'react';

import './Card.css';

interface ICard{
    className?: string,
    style?: CSSProperties,
    children: React.ReactNode
}

const Card = (props:ICard) => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default Card;
