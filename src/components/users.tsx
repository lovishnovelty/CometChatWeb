import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { CometChat } from '@cometchat-pro/chat';
import { useNavigate } from 'react-router-dom';
import { CometChatService } from '../services/cometchat';
import { Divider } from '@mui/material';
import { IConversation, IModalHandle } from '../interface/common';
import { rejectIncomingCall } from '../service/common';

const UserList = () => {
  const navigate = useNavigate();
  const [visible, setModalVisible] = useState(false);
  const incomingCallModalRef = useRef<IModalHandle>(null);
  const close = () => setOpen(false);
  useImperativeHandle(incomingCallModalRef, () => ({
    open: () => setOpen(true),
    close,
  }));
  const [users, setUsers] = useState([]);
  const [incomingCallID, setIncomingCallID] = useState('');
  const acceptIncomingCall = async (sessionId: string) => {
    const acceptedCall = await CometChat.acceptCall(sessionId);
    navigate('/callScreen', {
      state: {
        sessionID: acceptedCall.getSessionId(),
      },
    });
  };
  const listenForCall = (modalRef: React.RefObject<IModalHandle>) => {
    CometChat.addCallListener(
      'listnerId',
      new CometChat.CallListener({
        onIncomingCallReceived: (incomingCall: CometChat.Call) => {
          setIncomingCallID(incomingCall.getSessionId());
          console.log(
            incomingCall.getSessionId(),
            ' incomingCall.getSessionId()'
          );

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
  useEffect(() => {
    listenForCall(incomingCallModalRef);
  }, []);
  useEffect(() => {
    (async () => {
      const cometchatService = new CometChatService();
      const data: any = await cometchatService.getUsers();
      setUsers(data);
    })();
  }, []);
  const onClick = (user: any) => {
    const conversation: Omit<IConversation, 'lastMessage'> = {
      // id will be set in Chat screen when message is sent
      id: '',
      otherUserID: user.getUid(),
      otherUserName: user.getName(),
      otherUserAvatar: user.getAvatar(),
    };

    navigate('/chat', { state: { conversation: conversation } });
  };
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Modal
        // visible={visible}
        open={open}
        onClose={close}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              incomingCallModalRef.current?.close();
              acceptIncomingCall(incomingCallID);
            }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              rejectIncomingCall(incomingCallID);
              incomingCallModalRef.current?.close();
            }}
          >
            Reject
          </Button>
        </div>
      </Modal>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.map((item: any) => {
          var tempTime = moment.duration(item.lastActiveAt);
          return (
            <>
              <ListItem key={item.uid} onClick={() => onClick(item)}>
                <ListItemAvatar>
                  <Avatar>{/* <ImageIcon /> */}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`${
                    tempTime.hours() > 0
                      ? tempTime.hours() + ' hours'
                      : tempTime.minutes() + ' mins'
                  } ago`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
    </div>
  );
};

export default UserList;
