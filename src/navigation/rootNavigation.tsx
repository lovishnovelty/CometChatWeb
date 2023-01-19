import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/login';
import UserList from '../components/users';
import { CallingScreen } from '../screen/callingScreen';
import { CallScreen } from '../screen/callScreen';
import { ChatScreen } from '../screen/chatScreen';
import { DefaultCall } from '../screen/defaultCall';

export const RootNavigation = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/user" element={<UserList />}></Route>
          <Route path="/defaultCall" element={<DefaultCall />}></Route>
          <Route path="/chat" element={<ChatScreen />}></Route>
          <Route path="/callingScreen" element={<CallingScreen />}></Route>
          <Route path="/callScreen" element={<CallScreen />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
