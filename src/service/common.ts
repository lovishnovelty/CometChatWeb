import { CometChat } from '@cometchat-pro/chat';
import { IModalHandle } from '../interface/common';
import { useNavigate } from 'react-router-dom';

let conversationRequestBuilder: CometChat.ConversationsRequestBuilder;
let messageRequestBuilder: CometChat.MessagesRequestBuilder;
let callSettingsBuilder: CometChat.CallSettingsBuilder;
let userRequestBuilder: CometChat.UsersRequestBuilder;
conversationRequestBuilder = new CometChat.ConversationsRequestBuilder();
callSettingsBuilder = new CometChat.CallSettingsBuilder();
messageRequestBuilder = new CometChat.MessagesRequestBuilder();
userRequestBuilder = new CometChat.UsersRequestBuilder();
export const ListenForCall = (modalRef: React.RefObject<IModalHandle>) => {
  const navigate = useNavigate();
  CometChat.addCallListener(
    'listnerId',
    new CometChat.CallListener({
      onIncomingCallReceived: (incomingCall: CometChat.Call) => {
        modalRef.current?.open();
      },
      onIncomingCallCancelled: (cancelledCall: CometChat.Call) => {
        modalRef.current?.close();
      },
      onOutgoingCallAccepted: (acceptedCall: CometChat.Call) => {
        navigate('/callScreen', {
          state: { sessionID: acceptedCall.getSessionId() },
        });
      },
      onOutgoingCallRejected: (rejectedCall: CometChat.Call) => {
        navigate(-1);
      },
    })
  );
};
export const joinCall = ({
  sessionID,
  audioOnly = false,
  onCallEnded,
  onUserJoined,
  onUserListUpdated,
  callType,
}: {
  sessionID: string;
  audioOnly?: boolean;
  onUserJoined?: (user: CometChat.User) => void;
  onUserLeft?: (user: CometChat.User) => void;
  onCallEnded?: (call: CometChat.Call) => void;
  onUserListUpdated?: (userList: CometChat.User[]) => void;
  callType: string;
}) => {
  const callListener = new CometChat.OngoingCallListener(
    document.getElementById('call'),
    {
      onUserJoined,
      onUserListUpdated,
      onCallEnded,
      onError: (error: CometChat.CometChatException) => {
        console.log('Call Error: ', error);
      },
      // onAudioModesUpdated: (audioModes: CometChat.AudioMode[]) => {
      //   console.log('audio modes:', audioModes);
      // },
    }
  );

  return (
    callSettingsBuilder
      .enableDefaultLayout(true)
      .setSessionID(sessionID)
      .setIsAudioOnlyCall(audioOnly)
      .setIsAudioOnlyCall(callType == 'audio' ? true : false)
      // .setCallEventListener(callListener)
      .build()
  );
};

// export const acceptIncomingCall = async (sessionId: string) => {
//   const navigate = useNavigate();

//   const acceptedCall = await CometChat.acceptCall(sessionId);
//   navigate('/callScreen', {
//     state: {
//       sessionID: acceptedCall.getSessionId(),
//     },
//   });
// };

export const rejectIncomingCall = (
  sessionId: string,
  callStatus = CometChat.CALL_STATUS.REJECTED
) => {
  return CometChat.rejectCall(sessionId, callStatus);
};

export const removeMessageListener = (listenerID: string) => {
  CometChat.removeMessageListener(listenerID);
};
