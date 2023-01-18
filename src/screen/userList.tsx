import React, { useEffect, useState } from 'react';
import { getUsers } from '../service/getUser';
import { CometChat } from '@cometchat-pro/chat';

export const UserList = () => {
  console.log('user');

  const [users, setUsers] = useState<CometChat.User[]>([]);
  console.log(users);

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
