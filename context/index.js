import { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import rootReducer from './rootReducer';
import { LOGIN } from './types';
import axios from 'axios';

// context
const Context = createContext();

const initialState = {
  user: null,
  boards: [],
};

// provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  // get data from localStorage to context
  useEffect(() => {
    dispatch({
      type: LOGIN,
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
