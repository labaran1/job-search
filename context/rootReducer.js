import { BOARDS, LOGIN, LOGOUT } from './types';

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case BOARDS:
      return { ...state, boards: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
