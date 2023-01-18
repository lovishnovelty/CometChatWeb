import { CometChat } from '@cometchat-pro/chat';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { joinCall } from '../service/common';

export const CallScreen = ({ route }: any) => {
  const navigate = useNavigate();
  const { sessionID } = route.params;
  //   const getSettings = () => {
  //     return joinCall({
  //       sessionID: sessionID ?? 'abc',
  //       onCallEnded: navigate(-1),
  //     });
  //   };

  return (
    <div
      id="call"
      style={{ height: '100%', width: '100%', position: 'relative' }}
    >
      {/* <CometChat.CallingComponent callsettings={getSettings()} /> */}
    </div>
  );
};
