import React, { useRef } from 'react';
import { NavBar } from '../components/narBar';
import { CometChatService } from '../services/cometchat';

export const DefaultCall = () => {
  const inputRef = useRef<any>();

  return (
    <>
      <NavBar />
      <div style={{ marginTop: 50, margin: 30 }}>
        {/* <CometChatUI /> */}
        <input
          placeholder="Add session Id"
          ref={inputRef}
          style={{ width: '100%', height: '5vh' }}
        />
        <button
          onClick={() => {
            CometChatService.startDirectCall(
              document.getElementById('callscreen')!,
              inputRef.current.value
            );
          }}
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 4,
            borderRadius: 3,
            margin: 10,
          }}
        >
          Join Call
        </button>
      </div>
      <div
        id="callscreen"
        style={{ flex: 1, width: '100%', height: '100vh' }}
      ></div>
    </>
  );
};
