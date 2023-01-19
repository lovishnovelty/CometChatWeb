import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CometChatService } from '../services/cometchat';
import { createID } from '../util';
import { useNavigate } from 'react-router-dom';
import { BiLoaderAlt } from 'react-icons/bi';
const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [isLoading, setisLoading] = useState(false);
  console.log(isLoading, 'isLoading');

  const cometchatService = new CometChatService();
  const login = async () => {
    setisLoading(true);
    try {
      let userID = createID(5);
      const user = await cometchatService.login(userID, value);
      await localStorage.setItem('userID', user.getUid());
      setisLoading(false);
      navigate('/user');
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
        style={{ padding: 4, paddingTop: 1, paddingBottom: 1 }}
        variant="contained"
        onClick={() => {
          if (value) {
            login();
          }
        }}
      >
        <h5 style={{ paddingRight: 4 }}>Login</h5>
        {isLoading && <BiLoaderAlt />}
      </Button>
    </Box>
  );
};

export default Login;
