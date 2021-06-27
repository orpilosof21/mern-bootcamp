import React from "react";

import './MainHeader.css';

const MainHeader = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
    return <header className="main-header">{props.children}</header>;
};

export default MainHeader;