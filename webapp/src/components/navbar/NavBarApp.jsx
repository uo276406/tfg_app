import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  SnippetsOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import UsersConnector from "../../api/usersconnector";

/**
 * A functional component that renders a navigation bar with links to various pages and language options.
 * @returns The rendered navigation bar.
 */
function NavBarApp(props) {
  const { i18n, t } = useTranslation();

  const logout = async () => {
    let connector = new UsersConnector();
    await connector.logoutUser(props.accessToken).then((responseLogout) => {
      props.updateAccessToken("");
    });
  };

  // Menu items
  const items = [
    {
      label: <Link to="/">Keywords App</Link>,
      key: "app",
    },
    {
      label: <Link to="/doc">{t("doc")}</Link>,
      key: "doc",
      icon: <SnippetsOutlined />,
      style: { marginLeft: "auto" },
    },
    {
      label: t("lang"),
      key: "lang",
      icon: <SnippetsOutlined />,
      children: [
        {
          label: t("spanish"),
          key: "ES",
          onClick: () => onClickChangeLang("es"),
        },
        {
          label: t("english"),
          key: "EN",
          onClick: () => onClickChangeLang("en"),
        },
      ],
    },
  ];

  const itemsLogin = [
    ...items,
    {
      label: <Link to="/login">{t("login")}</Link>,
      key: "login",
      icon: <LoginOutlined />,
    },
    {
      label: <Link to="/signin">{t("signin")}</Link>,
      key: "signin",
      icon: <LoginOutlined />,
    },
  ];

  const itemsLogout = [
    ...items,
    {
      label: <Link to="/logout">{t("logout")}</Link>,
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];

  // Cambia idioma ----------------------------------------------------
  const onClickChangeLang = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <Menu
      theme="dark"
      selectable={false}
      mode="horizontal"
      items={props.accessToken === "" ? itemsLogin : itemsLogout}
    ></Menu>
  );
}

export default NavBarApp;
