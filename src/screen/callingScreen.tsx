import React from 'react';
import { useLocation } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router-dom';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { MdCallEnd } from 'react-icons/md';
export const CallingScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { sessionID, otherUserAvatar, otherUserName, isaudioOnly } = state;
  const rejectIncomingCall = (
    sessionId: string,
    callStatus = CometChat.CALL_STATUS.REJECTED
  ) => {
    return CometChat.rejectCall(sessionId, callStatus);
  };
  const onHangup = () => {
    rejectIncomingCall(sessionID, CometChat.CALL_STATUS.CANCELLED);
    navigate(-1);
  };
  return (
    <div>
      {/* <CustomAvatar url={otherUserAvatar} size={SizeConfig.screenWidth * 0.5} /> */}
      <h2>{otherUserName}</h2>
      <h3>Calling...</h3>

      <div>
        <IconButton onClick={onHangup}>
          <MdCallEnd />
        </IconButton>
      </div>
    </div>
  );
};
