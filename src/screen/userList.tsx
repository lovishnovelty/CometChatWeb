import React, { useEffect, useState } from 'react';
import { getUsers } from '../service/getUser';
import { CometChat } from '@cometchat-pro/chat';

export const UserList = () => {
  const [users, setUsers] = useState<CometChat.User[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);
  return (
    <div>
      {users.map((item: any) => (
        <h1>{item?.name}</h1>
      ))}
    </div>
  );
};
