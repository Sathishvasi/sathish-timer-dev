const initialState = {
  demoVal: 'sathish',
  timerValue: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TIMER_VALUE':
      return {
        ...state,
        timerValue: action.value.timerValue,
      };
    default:
      return state;
  }
}

export default rootReducer;
