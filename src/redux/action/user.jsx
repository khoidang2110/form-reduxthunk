import axios from "axios";
import { SET_BUTTON, SET_USER } from "../constant/user";
export let setUserAction = () => {
  return (dispatch) => {
    axios({
        url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/users",
        method: "GET",
      })
        .then((res) => {
      let action = {
        type: SET_USER,
        payload: res.data,
      };
       dispatch(action);
        })
        .catch((err) => {
          console.log(err);
        });
  };
};

export let setButtonAction = ()=> {
  return(dispatch) => {
    let action = {
      type: SET_BUTTON,
      payload: showButton,
    };
     dispatch(action);
  }
}