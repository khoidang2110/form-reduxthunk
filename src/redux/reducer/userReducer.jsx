import { SET_DATA_FORM, SET_USER } from "../constant/user"

const initialState = {
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
 

  default:
    return state
  }
}
