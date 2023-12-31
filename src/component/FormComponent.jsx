import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { connect } from "react-redux";
import { setUserAction } from "../redux/action/user";
import { createRef } from "react";
import { SET_BUTTON, SET_DATA_FORM } from "../redux/constant/user";
import { message } from "antd";
class FormComponent extends Component {
  componentDidMount() {
    this.inputRef.current.focus();
    console.log(this.inputRef.current.value)
  }
  formRef = createRef();

  inputRef = createRef();
  inputRef1 = createRef();
  inputRef2 = createRef();

  handleChangeForm = (event) => {
    let { value, name } = event.target;
    let user = { ...this.props.user, [name]: value };
   
    this.props.handleSetDataForm(user);
  };
  handleAddUser = () => {
    // điều kiện để tránh trường hợp nhập thông tin rỗng

    let string1 = this.props.user.name.trim();
    let string2 = this.props.user.account.trim();
    let string3 = this.props.user.password.trim();
    let string4 = this.inputRef.current.value.trim();
    if(string1.length == 0||string2.length==0 || string3.length==0 || string4.length==0){
      console.log("rỗng")
      message.warning("vui lòng nhập đầy đủ thông tin!!!")
      return;
    }
   
      axios({
        url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/users",
        method: "POST",
        data: this.props.user,
      })
        .then((res) => {
          console.log(res);

          this.props.handleSetUser();
          
          this.inputRef.current.value = "";
          this.inputRef1.current.value = "";
          this.inputRef2.current.value = "";
          this.props.user.name = "";
          this.props.user.account = "";
          this.props.user.password = "";
          message.info("thêm thành công");
        })
      
      

        .catch((err) => {
          console.log(err);
        });
   
  };
  handleUpdateUser = () => {
    axios({
      url: `https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/users/${this.props.user.id}`,
      method: "PUT",
      data: this.props.user,
    })
      .then((res) => {
        console.log(res);
        this.props.handleSetButton();
        this.props.handleSetUser();

        this.props.user.name = "";
        this.props.user.account = "";
        this.props.user.password = "";
        message.warning("cập nhật thành công");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container mt-5">
        <Form ref={this.formRef}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={this.inputRef}
                onChange={this.handleChangeForm}
                value={this.props.user.name}
                name="name"
                type="text"
                className="form-control name"
                id=""
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccount">
              <Form.Label>Account</Form.Label>
              <Form.Control
                ref={this.inputRef1}
                onChange={this.handleChangeForm}
                value={this.props.user.account}
                name="account"
                type="text"
                className="form-control"
                id=""
                placeholder="Account"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={this.inputRef2}
                onChange={this.handleChangeForm}
                value={this.props.user.password}
                name="password"
                type="text"
                className="form-control"
                id=""
                placeholder="Password"
              />
            </Form.Group>
          </Row>
          {this.props.setButton ? (
            <Button
              variant="primary"
              type="button"
              onClick={this.handleAddUser}
            >
              Add
            </Button>
          ) : (
            <Button
              variant="warning"
              type="button"
              onClick={this.handleUpdateUser}
            >
              Update
            </Button>
          )}
        </Form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    setButton: state.userReducer.showButton,
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
    // tắt mở nút Update
    handleSetButton: (showButton) => {
      dispatch({
        type: SET_BUTTON,
        payload: showButton,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
