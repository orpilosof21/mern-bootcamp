import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getUsersRoutes } from "../../shared/Utils/urlFetch";

import UserList, { IUserList } from "../components/UserList/UserList";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState<IUserList>([]);
  const httpClient = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resData = await httpClient.sendRequest(getUsersRoutes(""));
        setLoadedUsers(resData.users);
      } catch (err: any) {}
    };
    fetchUsers();
  }, [httpClient.sendRequest]);

  const errorHandler = () => {
    httpClient.clearError();
  };
  return (
    <>
      <ErrorModal error={httpClient.error} onClear={errorHandler} />
      {httpClient.isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!httpClient.isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
};

export default Users;
