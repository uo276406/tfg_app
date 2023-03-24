import { Menu } from "antd";
import { Link } from "react-router-dom";
import {
  SnippetsOutlined,
  LoginOutlined,
  QuestionOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

function NavBarApp() {
  return (
    <Menu theme="dark" selectable={true} mode="horizontal">
        <Menu.Item key="menuHome">
          <Link to="/">Keywords App</Link>
        </Menu.Item>

        <Menu.Item style={{ marginLeft: 'auto' }} key="menuDoc" icon={<SnippetsOutlined />}>
          <Link to="/doc">Documentación</Link>
        </Menu.Item>

        <Menu.Item key="menuAbout" icon={<QuestionOutlined />}>
          <Link to="/about">Sobre mí</Link>
        </Menu.Item>

        <Menu.Item key="menuContact" icon={<PhoneOutlined />}>
          <Link to="/contact">Contacto</Link>
        </Menu.Item>

        <Menu.Item key="menuLogin" icon={<LoginOutlined />}>
          <Link to="/login">Inicia sesión</Link>
        </Menu.Item>

        <Menu.Item key="menuSignin" icon={<LoginOutlined />}>
          <Link to="/signin">Registro</Link>
        </Menu.Item>
    </Menu>
  );
}

export default NavBarApp;
