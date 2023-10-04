import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { connect } from "react-redux";
import { setUserAction } from "../redux/action/user";
import { createRef } from "react";
import { SET_DATA_FORM } from "../redux/constant/user";
class FormComponent extends Component {
  componentDidMount() {
    this.inputRef.current.focus();
  }
  inputRef = createRef();
  inputRef1 = createRef();
  inputRef2 = createRef();

  state = {
    user: {
      name: "",
      account: "",
      password: "",
    },
  };
  handleChangeForm = (event) => {
    let { value, name } = event.target;
    let user = { ...this.props.user, [name]: value };
    this.props.handleSetDataForm(user);
  };
  handleAddUser = () => {
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

        this.props.handleSetUser();
        this.inputRef.current.value = "";
        this.inputRef1.current.value = "";
        this.inputRef2.current.value = "";
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
                className="form-control"
                id=""
                placeholder="Name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAccount">
              <Form.Label>Account</Form.Label>
              <Form.Control
                ref={this.inputRef2}
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
                ref={this.inputRef1}
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
          <Button variant="primary" type="button" onClick={this.handleAddUser}>
            Add
          </Button>{" "}
          <Button
            variant="warning"
            type="button"
            onClick={this.handleUpdateUser}
          >
            Update
          </Button>
        </Form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormComponent);
