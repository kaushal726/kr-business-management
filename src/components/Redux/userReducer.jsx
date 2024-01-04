
const initialState = {
  login: false,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        login: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
