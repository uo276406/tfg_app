import { Menu } from "antd";
import React, { useState} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  SnippetsOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
  EditOutlined,
  UsergroupAddOutlined,
  CheckCircleOutlined,
  ToolFilled,
} from "@ant-design/icons";
import UsersConnector from "../../api/usersconnector";

/**
 * A functional component that renders a navigation bar with links to various pages and language options.
 * @returns The rendered navigation bar.
 */
function NavBarApp(props) {
  const { i18n, t } = useTranslation();

  const [currentLang, setCurrentLang] = useState(t("spanish"));

  const logout = async () => {
    let connector = new UsersConnector();
    await connector.logoutUser(props.accessToken).then((responseLogout) => {
      props.clearLocalStorage();
    });
  };

  // Menu items

  const itemsLogin = [
    {
      label: <Link to="/">Keywords App</Link>,
      key: "app",
    },
    {
      label: <Link to="/test">{t("joinTest")}</Link>,
      key: "jointest",
      icon: <UsergroupAddOutlined />,
      style: { marginLeft: "auto" },
    },
    {
      label: <Link to="/doc">{t("doc")}</Link>,
      key: "doc",
      icon: <SnippetsOutlined />,
    },
    {
      label: currentLang,
      key: "lang",
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
    {
      label: <Link to="/">Keywords App</Link>,
      key: "app",
    },
    {
      label: <Link to="/results">{t("results")}</Link>,
      key: "results",
      icon: <CheckCircleOutlined />,
      style: { marginLeft: "auto" },
    },
    {
      label: <Link to="/process">{t("createExams")}</Link>,
      key: "process",
      icon: <EditOutlined />,
    },
    {
      label: <Link to="/doc">{t("doc")}</Link>,
      key: "doc",
      icon: <SnippetsOutlined />,
    },
    {
      label: currentLang,
      key: "lang",
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
    {
      label: t("profile") + " " + props.username,
      key: "profile",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link to="/profile">{t("seeProfile")}</Link>,
          key: "seeProfile",
          icon: <ToolFilled />,
        },
        {
          label: <Link to="/logout">{t("logout")}</Link>,
          key: "logout",
          icon: <LogoutOutlined />,
          onClick: logout,
        },
      ],
    },
  ];

  // Cambia idioma ----------------------------------------------------
  const onClickChangeLang = (code) => {
    i18n.changeLanguage(code);
    if (code === "es") {
      setCurrentLang(t("spanish"));
    } else {
      setCurrentLang(t("english"));
    }
  };

  return (
    <Menu
      theme="dark"
      selectable={false}
      mode="horizontal"
      items={
        props.accessToken === "" || props.accessToken === null
          ? itemsLogin
          : itemsLogout
      }
    ></Menu>
  );
}

export default NavBarApp;
