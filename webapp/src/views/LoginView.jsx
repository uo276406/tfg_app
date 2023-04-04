import React from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";


function LoginView(props) {

  const { t } = useTranslation();

  async function sendLogin(values) {
    props.sendLoginToConsole({
      email: values.email,
      password: values.email,
    });
  }

  return (
      <Row style={{ marginTop: 34, marginBottom: 34, height: "100%" }}>
        <Col span={24} style={{height: "100%"}}>
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
                label={t("email")}
                name="email"
                rules={[
                  { required: true, message: t("inputEmailCompulsory") },
                ]}
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
