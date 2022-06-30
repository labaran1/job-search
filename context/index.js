import { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import rootReducer from './rootReducer';
import { LOGIN } from './types';

// context
const Context = createContext();

const initialState = {
  user: null,
  boards: [
    {
      name: 'job-Search-2022',
      id: '1',
      section: [
        {
          name: 'Waiting',
          jobs: [
            {
              title: 'Software Engineer',
              company: 'Google',
              id: '3',
            },
            {
              title: 'Software Engineer',
              company: 'Facebook',
              id: '2',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '4',
            },
          ],
        },
        {
          name: 'Applied',
          jobs: [
            {
              title: 'Software Architect',
              company: 'Google',
              id: '5',
            },
            {
              title: 'Software Engineer',
              company: 'Twitter',
              id: '6',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
          ],
        },
      ],
    },
    {
      name: 'job-search-1',
      id: 2,
    },
  ],
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
