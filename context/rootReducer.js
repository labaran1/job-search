import { ADDBOARD, BOARDS, LOGIN, LOGOUT } from './types';

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    case BOARDS:
      return { ...state, boards: action.payload };
    case ADDBOARD: {
      let a = state.boards;
      a.push(action.payload);
      return { ...state, boards: [...a] };
    }
    default:
      return state;
  }
};

export default rootReducer;
