import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserList } from '../screen/userList';

export const RootNavigation = () => {
  console.log('routes');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />}></Route>
      </Routes>
    </div>
  );
};
