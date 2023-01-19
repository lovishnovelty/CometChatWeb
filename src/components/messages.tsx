import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../context';
import { Button, TextField } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
import { CometChatService } from '../services/cometchat';
import { ChatUtility } from '../util/chatUtility';
import { ChatAppBar } from './appbar';
import { CometChat } from '@cometchat-pro/chat';
import { useNavigate } from 'react-router-dom';
import { MdSend } from 'react-icons/md';

const Messages = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<any>(null);
  const { state, dispatch }: any = useContext(MainContext);
  const cometchatService = new CometChatService();
  const [value, setValue] = useState('');

  useEffect(() => {
    cometchatService.listenForMessage({
      listenerID: 'listner_id',
      onTextMessageReceived: (text) => {
        if (state.user.uid === text.getSender().getUid()) {
          dispatch({
            type: 'append_messages',
            payload: ChatUtility.transformSingleMessage(
              text,
              localStorage.getItem('userID') ?? ''
            ),
          });
          scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      },
    });
  }, [state.user]);

  const RenderItem = ({ item }: any) => {
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [scrollRef]);

    const me = item.isSentByMe
      ? {
          alignSelf: 'flex-end',
          marginBottom: 10,
          backgroundColor: 'black',
          color: 'white',
          padding: 10,
          borderRadius: 10,
          marginRight: 10,
          marginLeft: 10,
        }
      : {
          alignSelf: 'flex-start',
          marginBottom: 10,
          backgroundColor: '#ffffff',
          padding: 20,
          borderRadius: 10,
        };
    return (
      <>
        {item.isTextMessage && <div style={me}>{item.text}</div>}

        {!item.isTextMessage && (
          <div
            style={{
              alignSelf: 'center',
              padding: 10,
              marginBottom: 10,
              backgroundColor: '#e6e6e6',
              borderRadius: 10,
            }}
          >
            {item.text}
          </div>
        )}
        <div ref={scrollRef} />
      </>
    );
  };

  const sendMessage = async () => {
    await cometchatService.sendTextMessage({
      userID: localStorage.getItem('userID') ?? '',
      receiverID: state.user.uid,
      message: value,
    });
    dispatch({
      type: 'append_messages',
      payload: { text: value, isSentByMe: true, isTextMessage: true },
    });
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
      receiverID: state?.user?.uid,
    });

    navigate('/callingScreen', {
      state: {
        sessionID: call.getSessionId(),
        otherUserAvatar: state?.user?.uid,
        otherUserName: state?.user?.name,
        isaudioOnly: false,
      },
    });
  };
  const startAudioCall = async () => {
    const call = await initiateCall({
      receiverID: state?.user?.uid,
    });

    navigate('/callingScreen', {
      state: {
        sessionID: call.getSessionId(),
        otherUserAvatar: state?.user?.uid,
        otherUserName: state?.user?.name,
        isaudioOnly: true,
      },
    });
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <ChatAppBar
        name={state?.user?.name}
        audioCall={startAudioCall}
        videoCall={startVideoCall}
      />
      <div
        style={{
          backgroundColor: '#cccccc',
          height: '60vh',
          overflow: 'scroll',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
        }}
      >
        {state.messages.map((item: any, i: any) => (
          <RenderItem item={item} key={i} />
        ))}
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          backgroundColor: 'white',
          marginBottom: 20,
        }}
      >
        <TextField
          onChange={(text) => setValue(text.target.value)}
          fullWidth
          placeholder="Type your message"
          style={{
            width: '70%',
            alignSelf: 'center',
            marginRight: 10,
          }}
        />
        <Button
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: 3,
            borderRadius: 6,
          }}
          onClick={sendMessage}
        >
          <h3 style={{ marginRight: 4 }}>Send</h3> <MdSend />
        </Button>
      </div>
    </div>
  );
};

export default Messages;
