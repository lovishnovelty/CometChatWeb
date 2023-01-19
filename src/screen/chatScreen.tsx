import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ChatAppBar } from '../components/appbar';
import { useNavigate } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';

export const ChatScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const initiateCall = ({
    receiverID,
    callType = CometChat.CALL_TYPE.VIDEO,
    receiverType = CometChat.RECEIVER_TYPE.USER,
  }: {
    receiverID: string;
    callType?: string;
    receiverType?: string;
  }) => {
    const call = new CometChat.Call(receiverID, callType, receiverType);

    return CometChat.initiateCall(call);
  };
  const startVideoCall = async () => {
    const call = await initiateCall({
      receiverID: state.conversation.otherUserID,
    });

    navigate('/callScreen', {
      state: {
        sessionID: call.getSessionId(),
        otherUserAvatar: state.conversation.otherUserAvatar,
        otherUserName: state.conversation.otherUserName,
      },
    });
  };
  return (
    <ChatAppBar
      name={state.conversation.otherUserName}
      audioCall={startVideoCall}
      videoCall={startVideoCall}
    />
  );
  //   <div>{state.conversation.otherUserName}</div>;
};
