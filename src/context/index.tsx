import React, { useReducer } from 'react';

const MainContext = React.createContext({});

const initialState: any = {
  users: {},
  messages: [],
};

const reducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'set_user':
      return {
        ...state,
        user: action.payload.user,
        messages: action.payload.messages,
      };
    case 'set_messages':
      return { ...state, messages: action.payload };
    case 'append_messages':
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

const MainReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, dispatch };
};

export { MainContext, MainReducer };
