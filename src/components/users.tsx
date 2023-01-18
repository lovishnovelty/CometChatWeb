import { useContext, useEffect, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

import { CometChatService } from '../services/cometchat';
import { Divider } from '@mui/material';
import { MainContext } from '../context';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { dispatch }: any = useContext(MainContext);
  const cometChat = new CometChatService();

  useEffect(() => {
    (async () => {
      const cometchatService = new CometChatService();
      const data: any = await cometchatService.getUsers();

      const res = await cometChat.getMessagesByUID('p8voz', data[0].uid);

      dispatch({
        type: 'set_user',
        payload: { user: data[0], messages: res },
      });

      setUsers(data);
    })();
  }, []);

  const getMessages = async (item: any) => {
    const res = await cometChat.getMessagesByUID('p8voz', item.uid);
    dispatch({
      type: 'set_user',
      payload: { user: item, messages: res },
    });
  };

  return (
    <div style={{ width: 300 }}>
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
  );
};

export default UserList;
