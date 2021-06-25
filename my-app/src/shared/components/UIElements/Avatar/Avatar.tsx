import React, { CSSProperties } from 'react';

import './Avatar.css';

export interface IAvatar {
    className?: string,
    style?: CSSProperties,
    image: string,
    alt?: string,
    width?: number,
    height?: number
}

const Avatar = (props: IAvatar) => {
  return (
    <div className={`avatar ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.height }}
      />
    </div>
  );
};

export default Avatar;
