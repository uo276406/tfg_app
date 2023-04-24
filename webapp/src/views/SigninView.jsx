import React, { useState } from "react";
import { Button, Form, Input, Card, Col, Row, Alert} from "antd";
import { useTranslation } from "react-i18next";
import UsersConnector from "../api/usersconnector";

const signinStyle = {
  margin: "2%",
};

const alertStyle = {
  width: "100%",
  marginRight: "1.5%",
  marginBottom: "1.5%",
}

/**
 * A functional component that renders a sign-in form using Ant Design components.
 * @returns The sign-in form component.
 */
function SigninView(props) {

  const { t } = useTranslation();

  const [userExists, setUserExists] = useState(false);

  async function sendSignInToApi(values) {
    let connector = new UsersConnector();
    await connector
      .signinUser(
        values.name,
        values.surname1,
        values.surname2,
        values.email,
        values.password
      )
      .then((responseSignin) => {
        console.log(responseSignin);
        if (
          responseSignin.detail !== undefined &&
          responseSignin.detail === "REGISTER_USER_ALREADY_EXISTS"
        ) {
          setUserExists(true);
        }  else {
          setUserExists(false);
          //Inicia sesión y actualiza el token de acceso
          connector.loginUser(values.email, values.password).then((responseLogin) => {
            props.updateAccessToken(responseLogin.access_token);
          });
        }
      })
    }

  return (
    <Row style={signinStyle}>
      <Col span={24} style={{ height: "100%" }}>
      {userExists ? <Alert
        style={alertStyle}
          message={t("existUser")}
          description={t("existUserDescription")}
          type="error"
          showIcon
          closable
        /> : <></>}
        <Card title={t("signinTitle")} headStyle={{ textAlign: "center" }}>
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
            onFinish={sendSignInToApi}
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
