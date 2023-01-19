import { useRef } from 'react';

import './App.css';
import { CometChatService } from './services/cometchat';
import UserList from './components/users';
import { MainContext, MainReducer } from './context';
import Messages from './components/messages';
import { RootNavigation } from './navigation/rootNavigation';

// const callType = 'VIDEO' | 'AUDIO' | undefined;
function App() {
  const inputRef = useRef<any>();
  const { state, dispatch }: any = MainReducer();

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <div>
        <RootNavigation />
      </div>
    </MainContext.Provider>
  );
}

export default App;
