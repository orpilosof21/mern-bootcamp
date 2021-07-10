import React from "react";
import Card from "../../../shared/components/UIElements/Card/Card";

import UserItem, { IUserItem } from "../UserItem/UserItem";
import "./UserList.css";

export interface IUserList extends Array<IUserItem> {}

interface IUserListInput {
  items: IUserList;
}

function UserList(props: IUserListInput) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.placeCount}
        />
      ))}
    </ul>
  );
}

export default UserList;
