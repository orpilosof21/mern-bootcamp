import React from "react";
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export interface ISideDrawer {
    children: React.ReactChild,
    show: boolean,
    onClick: () => void,
}

const _timeout = 200;

const SideDrawer = (props: ISideDrawer) => {
    const asideNodeRef = React.useRef(null);
    return( 
    <CSSTransition nodeRef={asideNodeRef} in={props.show} classNames="slide-in-left" timeout={_timeout} mountOnEnter unmountOnExit>
        <aside ref={asideNodeRef} className="side-drawer" onClick={props.onClick}>
            {props.children}</aside>
    </CSSTransition>
    )
}

export default SideDrawer;