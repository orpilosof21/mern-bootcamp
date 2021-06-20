import React from "react";

import UserItem, {IUserItem} from './UserItem';
import './UserList.css';

export interface IUserList extends Array<IUserItem>{}

interface IUserListInput{
    items : IUserList
}


function UserList (props:IUserListInput){
    if (props.items.length === 0){
        return (
            <div className="center">
                <h2>No Users found</h2>
            </div>
        )
    }
    return(
        <ul className="users-list">
            {props.items.map(user => 
                <UserItem 
                id={user.id}
                image={user.image}
                name={user.name}
                placeCount={user.placeCount}
                />
            )}
        </ul>
    )
}

export default UserList;