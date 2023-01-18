import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import { CometChat } from '@cometchat-pro/chat';
import { CometChatService } from './services/cometchat';
import { RootNavigation } from './navigation/rootNavigation';
import { UserList } from './screen/userList';

const authKey = 'f7a9f594219a32a8177d445f037b59f2bfe963f4';
const uid = 'p8voz';

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

  const inputRef = useRef<any>();
  return (
    // <RootNavigation />
    <UserList />
    // <div style={{ width: '800px', height: '800px' }}>
    //   {/* <CometChatUI /> */}
    //   <input placeholder="Add session Id" ref={inputRef} />
    //   <button
    //     onClick={() => {
    //       CometChatService.startDirectCall(
    //         document.getElementById('callscreen'),
    //         inputRef.current.value
    //       );
    //     }}
    //   >
    //     Join Call
    //   </button>
    //   <div id="callscreen" style={{ height: '100vh', width: '100vw' }}></div>
    // </div>
  );
}

export default App;
