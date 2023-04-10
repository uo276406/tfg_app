import React from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

const loginStyle = {
  margin: "2%",
};

/**
 * A functional component that renders a login form.
 * @param {{object}} props - The props object that contains the sendLoginToConsole function.
 * @returns A JSX element that renders a login form.
 */
function LoginView(props) {
  const { t } = useTranslation();

  async function sendLogin(values) {
    props.sendLoginToConsole({
      email: values.email,
      password: values.email,
    });
  }

  return (
    <Row style={loginStyle}>
      <Col span={24}>
        <Card title={t("loginTitle")} headStyle={{ textAlign: "center" }}>
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
            onFinish={sendLogin}
            autoComplete="off"
          >
            <Form.Item
              label={t("email")}
              name="email"
              rules={[{ required: true, message: t("inputEmailCompulsory") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("password")}
              name="password"
              rules={[
                { required: true, message: t("inputPasswordCompulsory") },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: { offset: 0 },
                sm: { offset: 8, span: 24 / 3 },
              }}
            >
              <Button type="primary" htmlType="submit" block>
                {t("login")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginView;
