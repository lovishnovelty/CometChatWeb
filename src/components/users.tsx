import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { useNavigate } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatService } from '../services/cometchat';
import { Divider } from '@mui/material';
import { IConversation, IModalHandle } from '../interface/common';
import { rejectIncomingCall } from '../service/common';
import { MainContext } from '../context';
import Messages from './messages';
import { NavBar } from './narBar';

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { dispatch }: any = useContext(MainContext);
  const cometChat = new CometChatService();

  useEffect(() => {
    (async () => {
      const cometchatService = new CometChatService();
      const data: any = await cometchatService.getUsers();

      const res = await cometChat.getMessagesByUID(
        localStorage.getItem('userID') ?? '',
        data[0].uid
      );

      dispatch({
        type: 'set_user',
        payload: { user: data[0], messages: res },
      });

      setUsers(data);
    })();
  }, []);

  const getMessages = async (item: any) => {
    const res = await cometChat.getMessagesByUID(
      localStorage.getItem('userID') ?? '',
      item.uid
    );
    dispatch({
      type: 'set_user',
      payload: { user: item, messages: res },
    });
  };

  const [visible, setModalVisible] = useState(false);
  const incomingCallModalRef = useRef<IModalHandle>(null);
  const close = () => setOpen(false);
  useImperativeHandle(incomingCallModalRef, () => ({
    open: () => setOpen(true),
    close,
  }));
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

  return (
    <>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        <div style={{ width: 300 }}>
          <Modal
            // className={classes.modal}
            style={{
              margin: 300,
              backgroundColor: 'grey',
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              justifyContent: 'space-between',
            }}
            // visible={visible}
            open={open}
            onClose={close}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                borderColor: 'grey',
                justifyContent: 'space-evenly',
              }}
            >
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
                style={{ backgroundColor: 'red' }}
                variant="contained"
                onClick={() => {
                  rejectIncomingCall(incomingCallID);
                  incomingCallModalRef.current?.close();
                }}
              >
                Reject
              </Button>
            </div>
          </Modal>
          <List sx={{ bgcolor: 'background.paper' }}>
            {users.map((item: any) => {
              var tempTime = moment.duration(item.lastActiveAt);
              return (
                <div key={item.uid}>
                  <ListItem
                    style={{ cursor: 'pointer' }}
                    onClick={() => getMessages(item)}
                  >
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
                </div>
              );
            })}
          </List>
        </div>
        <Messages />
      </div>
    </>
  );
};

export default UserList;
