import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row } from "antd";
import { UserOutlined, LockOutlined, ContainerFilled } from "@ant-design/icons";
import _ from "lodash"
import "./LoginPage.css";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.Inputstate = {
      notice: "",
      type: "tab2",
      autoLogin: true,
    };
  }

  handleChangeInput = (event)=>{
    const target = event.target
    if (target){
      this.setState({
        [target.name]: target.value,
      })
    }
  }
  handleSubmit = () => {
    if (!_.isEmpty(this.state.email) && !_.isEmpty(this.state.password)){
      this.props.onLoginNormal({email: this.state.email, password: this.state.password}, ()=>{
        
        this.props.history.push('/')
      })
    }
  }
 
  render() {
    return (
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <div
          style={{
            position: "absolute",
            zIndex: "100",
            width: "40%",
            border: "1px solid",
          }}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="email"

              style={{ padding: "10px 15px" }}
              rules={[
                { required: true, message: "Email không được để trống " },
              ]}
            >
              <Input
                name="email"
                onChange={this.handleChangeInput}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              style={{ padding: "10px 15px" }}
              rules={[
                { required: true, message: "Mật khẩu không được để trống" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                onChange={this.handleChangeInput}

                name="password"
                placeholder="Mật khẩu "
              />
            </Form.Item>

            <Form.Item style={{ padding: "10px 15px" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Row>
    );
  }
}

export default withRouter(LoginPage);
