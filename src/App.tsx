import React, { useContext, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { CometChat } from '@cometchat-pro/chat';
import { CometChatService } from './services/cometchat';
import UserList from './components/users';
import { MainContext, MainReducer } from './context';
import Messages from './components/messages';

const authKey = 'f7a9f594219a32a8177d445f037b59f2bfe963f4';
const uid = 'p8voz';

// const callType = 'VIDEO' | 'AUDIO' | undefined;
function App() {
  const inputRef = useRef<any>();
  const { state, dispatch }: any = MainReducer();

  useEffect(() => {
    CometChat.login(uid, authKey).then(
      (user) => {
        localStorage.setItem('userID', uid);
        console.log('Login Successful:', { user });
      },
      (error) => {
        console.log('Login failed with exception:', { error });
      }
    );

    // CometChat.startCall(receiverID, 'video')
    //   .then((call: any) => {
    //     console.log('Call started successfully:', call);
    //   })
    //   .catch((error: any) => {
    //     console.log('Error starting call:', error);
    //   });
  }, []);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <div>
        {/* <CometChatUI /> */}
        <input placeholder="Add session Id" ref={inputRef} />
        <button
          onClick={() => {
            CometChatService.startDirectCall(
              document.getElementById('callscreen'),
              inputRef.current.value
            );
          }}
        >
          Join Call
        </button>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
          <UserList />
          <Messages />
        </div>
        {/* <div id="callscreen" style={{ height: '100vh', width: '100vw' }}></div> */}
      </div>
    </MainContext.Provider>
  );
}

export default App;
