const initialState = {
  demoVal: 'sathish',
  timerValue: '',
  bannerImageFinal: false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TIMER_VALUE':
      return {
        ...state,
        timerValue: action.value.timerValue,
      }
    case 'SET_IMAGE':
      return {
        ...state,
        bannerImageFinal: action.value.setImage,
      }
    default:
      return state;
  }
}

export default rootReducer;
