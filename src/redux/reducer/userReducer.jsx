import { SET_BUTTON, SET_DATA_FORM, SET_USER } from "../constant/user"

const initialState = {
  showButton: true,
    users: [],
    user:{
      name:"",
      account:"",
      password:"",
    }
}

export let userReducer =  (state = initialState, { type, payload }) => {
  switch (type) {
case SET_USER: {
  state.users = payload;
  return {...state};
  
}
case SET_DATA_FORM: {
  state.user = payload;
  return {...state};
}
case SET_BUTTON: {
  state.showButton ? state.showButton = false : state.showButton = true
  //state.showButton = false;
  return {...state};
}
 

  default:
    return state
  }
}
