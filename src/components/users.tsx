import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import moment from 'moment';

import { CometChatService } from '../services/cometchat';
import { Divider } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const cometchatService = new CometChatService();
      const data: any = await cometchatService.getUsers();
      setUsers(data);
    })();
  }, []);

  return (
    <div>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {users.map((item: any) => {
          var tempTime = moment.duration(item.lastActiveAt);
          return (
            <>
              <ListItem key={item.uid}>
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
