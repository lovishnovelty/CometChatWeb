import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { CometChat } from '@cometchat-pro/chat';
import { CometChatUI } from './cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import { LoginPage } from './login';
const authKey = 'f7a9f594219a32a8177d445f037b59f2bfe963f4';
const uid = 'nslxa';
const receiverID = '1234';
// const callType = 'VIDEO' | 'AUDIO' | undefined;
function App() {
  useEffect(() => {
    CometChat.login(uid, authKey).then(
      (user) => {
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
    <div style={{ width: '800px', height: '800px' }}>
      {/* <CometChatUI /> */}
      <LoginPage />
    </div>
  );
}

export default App;
