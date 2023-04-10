import React from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

const signinStyle = {
  margin: "2%",
};

/**
 * A functional component that renders a sign-in form using Ant Design components.
 * @returns The sign-in form component.
 */
function SigninView() {
  const { t } = useTranslation();

  return (
    <Row style={signinStyle}>
      <Col span={24} style={{ height: "100%" }}>
        <Card title={t("signinTitle")} headStyle={{ textAlign: "center" }}>
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label={t("name")}
              name="name"
              rules={[{ required: true, message: t("inputName") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("firstSurname")}
              name="surname1"
              rules={[{ required: true, message: t("inputFirstSurname") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("secondSurname")}
              name="surname2"
              rules={[{ required: false, message: t("inputSecondSurname") }]}
            >
              <Input />
            </Form.Item>

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
              label={t("confirmPassword")}
              name="passwordConfirm"
              rules={[{ required: true, message: t("repeatPassword") }]}
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
                {t("signin")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SigninView;
