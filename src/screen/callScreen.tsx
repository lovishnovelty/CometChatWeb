import { CometChat } from '@cometchat-pro/chat';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CometChatService } from '../services/cometchat';

export const CallScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const element = document.getElementById('test')!;
    CometChatService.startDefaultCall(
      element,
      state?.sessionID,
      state?.isaudioOnly
    );
  }, []);
  return (
    <div
      style={{
        height: '100vh',
      }}
      id="test"
    ></div>
  );
};
