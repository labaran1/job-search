import { createContext } from 'react';
import { useReducer } from 'react';
import rootReducer from './rootReducer';

// context
const Context = createContext();

const initialState = {
  user: null,
};

// provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
