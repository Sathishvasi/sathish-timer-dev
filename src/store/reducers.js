const initialState = {
  demoVal: 'sathish',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        demoVal: action.value.demoVal,
      };
    default:
      return state;
  }
}

export default rootReducer;
