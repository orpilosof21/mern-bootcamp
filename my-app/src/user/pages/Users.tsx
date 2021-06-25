import React from "react";

import UserList, { IUserList } from "../components/UserList/UserList";

const Users = () => {
    let USERS : IUserList;
    USERS = [{id: 'u1', name: 'Max', image: 'https://img.cinemablend.com/filter:scale/quill/c/8/1/8/9/1/c8189186b9f3bf71d7c606f04923f105f12c3deb.jpg?mw=600', placeCount:3}]
    //USERS=[];
    return (<UserList items={USERS}/>)
};

export default Users;