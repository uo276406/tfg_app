import React from "react";
import { Button, Form, Input, Card, Col, Row, Alert } from "antd";
import { Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import UsersConnector from "../api/usersconnector";

const loginStyle = {
  margin: "2%",
};

const formStyle = {
  textAlign: "center",
};

const alertStyle = {
  width: "100%",
  marginRight: "1.5%",
  marginBottom: "1.5%",
}

/**
 * A functional component that renders a login form.
 * @param {{object}} props - The props object that contains the sendLoginToConsole function.
 * @returns A JSX element that renders a login form.
 */
function LoginView(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [badCredentials, setBadCredentials] = React.useState(false);
  const [userNotVerified, setUserNotVerified] = React.useState(false);

  const showAlert = (text, textDescription) => {
    return (
      <Alert
        style={alertStyle}
        message={text}
        description={textDescription}
        type="error"
        showIcon
      />
    );
  }

  async function sendLoginToApi(values) {
    let connector = new UsersConnector();
    await connector
      .loginUser(values.email, values.password)
      .then(async (responseLogin) => {
        console.log(responseLogin);
        if (
          responseLogin.detail !== undefined &&
          responseLogin.detail === "LOGIN_BAD_CREDENTIALS"
        ) {
          setBadCredentials(true);
        } else if (
          responseLogin.detail !== undefined &&
          responseLogin.detail === "LOGIN_USER_NOT_VERIFIED"
        ) {
          setUserNotVerified(true);
        } else {
          setBadCredentials(false);
          setUserNotVerified(false);
          props.updateAccessToken(responseLogin.access_token);
          await connector.userInfo(responseLogin.access_token).then((response) => {
            console.log(response)
            props.updateUser(response);
          });
          navigate("/");
        }
      });
  }

  return (
    <Row style={loginStyle}>
      <Col span={24}>
        {badCredentials ? (
          showAlert(t("credentialsError"), t("credentialsErrorDescription"))
        ) : (
          <></>
        )}
        {userNotVerified ? (
          showAlert(t("userNotVerified"), t("userNotVerifiedDescription"))
        ) : (
          <></>
        )}
        <Card
          style={formStyle}
          title={t("loginTitle")}
          headStyle={{ textAlign: "center" }}
        >
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
            onFinish={sendLoginToApi}
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
            <Link to="/signin">{t("registerIfNoAccount")}</Link>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default LoginView;
