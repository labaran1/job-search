import { createContext } from 'react';
import { useReducer } from 'react';
import rootReducer from './rootReducer';

// context
const Context = createContext();

const initialState = {
  user: null,
  boards: [
    { name: 'jobs1', id: 1 },
    { name: 'board2', id: 2 },
  ],
};

// provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //Todo:Get boards from server and save in state as boards
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
