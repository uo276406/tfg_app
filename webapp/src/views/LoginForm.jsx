import React from "react";
import { Button, Form, Input, Card } from "antd";

function LoginForm(props) {
  async function sendLogin(values) {
    props.sendLoginToConsole({
      email: values.email,
      password: values.email,
    });
  }

  return (
    <div>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 24 / 3 }}
          wrapperCol={{ span: 24 / 3 }}
          initialValues={{ remember: true }}
          onFinish={sendLogin}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 24 / 3 }}>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default LoginForm;
