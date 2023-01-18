import React, { useContext, useEffect, useRef, useState } from 'react';
import { MainContext } from '../context';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { CometChatService } from '../services/cometchat';
import { ChatUtility } from '../util/chatUtility';

const Messages = () => {
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
            payload: ChatUtility.transformSingleMessage(text, 'p8voz'),
          });
        }
      },
    });
  }, [state.user]);

  const RenderItem = ({ item }: any) => {
    const me = item.isSentByMe
      ? {
          alignSelf: 'flex-end',
          marginBottom: 10,
          backgroundColor: '#b35900',
          padding: 20,
          borderRadius: 10,
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
      </>
    );
  };

  const sendMessage = async () => {
    await cometchatService.sendTextMessage({
      userID: 'p8voz',
      receiverID: state.user.uid,
      message: value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '78%' }}>
      <div
        style={{
          backgroundColor: '#cccccc',
          height: '80vh',
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
          variant="contained"
          endIcon={<SendIcon />}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Messages;
