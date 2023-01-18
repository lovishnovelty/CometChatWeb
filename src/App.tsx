import { useRef } from 'react';

import './App.css';
import { CometChatService } from './services/cometchat';
import UserList from './components/users';
import { MainContext, MainReducer } from './context';
import Messages from './components/messages';

// const callType = 'VIDEO' | 'AUDIO' | undefined;
function App() {
  const inputRef = useRef<any>();
  const { state, dispatch }: any = MainReducer();

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
