import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CometChatService } from '../services/cometchat';
import { createID } from '../util';

const Login = () => {
  const [value, setValue] = useState('');
  const cometchatService = new CometChatService();
  const login = async () => {
    try {
      let userID = createID(5);
      const user = await cometchatService.login(userID, value);
      await localStorage.setItem('userID', user.getUid());
      return user;
    } catch (e) {
      throw 'failed to login';
    }
  };
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <TextField
        placeholder="Type your name"
        style={{ width: 300 }}
        onChange={(e) => setValue(e.target.value)}
      />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          if (value) {
            login();
          }
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
