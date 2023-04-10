import { Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  SnippetsOutlined,
  LoginOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

/**
 * A functional component that renders a navigation bar with links to various pages and language options.
 * @returns The rendered navigation bar.
 */
function NavBarApp() {
  const { i18n, t } = useTranslation();

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
      label: <Link to="/about">{t("about")}</Link>,
      key: "about",
      icon: <QuestionOutlined />,
    },
    {
      label: t("lang"),
      key: "lang",
      icon: <SnippetsOutlined />,
      children: [
        {
          label: t("spanish"),
          key: "ES",
          onClick: () => onClickChangeLang("es")
        },
        {
          label: t("english"),
          key: "EN",
          onClick: () => onClickChangeLang("en")
          
        },
      ],
    },
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

  // Cambia idioma ----------------------------------------------------
  const onClickChangeLang = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <Menu theme="dark" selectable={false} mode="horizontal" items={items} />
  );
}

export default NavBarApp;
