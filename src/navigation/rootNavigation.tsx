import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from '../components/users';
import { CallingScreen } from '../screen/callingScreen';
import { ChatScreen } from '../screen/chatScreen';

export const RootNavigation = () => {
  console.log('routes');

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserList />}></Route>
          <Route path="/chat" element={<ChatScreen />}></Route>
          <Route path="/callScreen" element={<CallingScreen />}></Route>
        </Routes>
      </Router>
    </div>
  );
};
