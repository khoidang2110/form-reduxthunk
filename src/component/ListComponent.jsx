import axios from "axios";
import React, { Component } from "react";

import { connect } from "react-redux";
import { setUserAction } from "../redux/action/user";
import { message } from "antd";
import { SET_BUTTON, SET_DATA_FORM } from "../redux/constant/user";

class ListComponent extends Component {
  componentDidMount() {
    this.props.handleSetUser();
  }
  handleRenderTable = () => {
    return this.props.users.reverse().map((user, index) => {
      return (
        <tr key={index}>
          <td> {user.id}</td>
          <td>{user.name}</td>
          <td>{user.account}</td>
          <td>{user.password}</td>
          <td>
            <button
              onClick={() => {
                this.handleDelete(user.id);
              }}
              className="btn btn-danger"
            >
              Delete
            </button>{" "}
            <button
              onClick={() => {
                this.handleGetDetail(user.id);
              }}
              className="btn btn-info"
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };
  handleDelete = (id) => {
    axios
      .delete(
        `https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/users/${id}`
      )
      .then((res) => {
        console.log(res);
        message.success("xoá thành công");
        this.props.handleSetUser();
      })
      .catch((err) => {
        console.log(err);
      });

  };
  handleGetDetail = (id) => {
    axios
      .get(`https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/users/${id}`)
      .then((res) => {
        console.log(res.data);
        this.props.handleSetDataForm(res.data);
        this.props.handleSetButton();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container">
        <table className="table ">
          <thead>
            <tr>
              <td style={{ fontWeight: "bold" }}>Id</td>
              <td style={{ fontWeight: "bold" }}>Name</td>
              <td style={{ fontWeight: "bold" }}>Account</td>
              <td style={{ fontWeight: "bold" }}>Password</td>
            </tr>
          </thead>
          <tbody>{this.handleRenderTable()}</tbody>
        </table>
      </div>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    users: state.userReducer.users,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    handleSetUser: () => {
      dispatch(setUserAction());
    },
    handleSetDataForm: (user) => {
      dispatch({
        type: SET_DATA_FORM,
        payload: user,
      });
    },
    handleSetButton: (showButton) => {
      dispatch({
        type: SET_BUTTON,
        payload: showButton,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);
