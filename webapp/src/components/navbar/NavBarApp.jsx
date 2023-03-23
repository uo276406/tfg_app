import { Menu, Col, Row } from "antd";
import { Link } from "react-router-dom";
import {
  SnippetsOutlined,
  LoginOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import "./NavBarApp.css";

function NavBarApp() {
  return (
    <Row>
      <Col style={{width:"50%" }}>
        <Menu
          theme="dark"
          selectable={false}
          mode="horizontal"
          items={[
            {
              key: "logo",
              label: (
                <Link to="/">
                  {" "}
                  <img src="logo.png" alt="KeywordsApp" />
                </Link>
              ),
            },
          ]}
          style={{ height: 64 }}
        ></Menu>
      </Col>
      <Col style={{ width: "50%" }}>
        <Menu
          theme="dark"
          selectable={true}
          mode="horizontal"
          items={[
            {
              key: "menuDoc",
              label: <Link to="/doc">Documentación</Link>,
              icon: <SnippetsOutlined />,
            },
            {
              key: "menuAbout",
              label: <Link to="/about">Sobre mí</Link>,
              icon: <QuestionOutlined />,
            },
            {
                key: "menuContact",
                label: <Link to="/contact">Contacto</Link>,
                icon: <QuestionOutlined />,
              },
            {
              key: "menuLogin",
              label: <Link to="/login">Inicia sesión</Link>,
              icon: <LoginOutlined />,
            },
            { key: "menuSignin", label: <Link to="/signin">Registro</Link> },
          ]}
        ></Menu>
      </Col>
    </Row>
  );
}

export default NavBarApp;
