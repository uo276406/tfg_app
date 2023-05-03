import React from "react";
import { Button, Form, Input, Card, Col, Row, Alert } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UsersConnector from "../api/usersconnector";

const loginStyle = {
  margin: "2%",
};

const formStyle = {
  textAlign: "center",
  margin: "4%",
};

function ProfileView() {
  const { t } = useTranslation();

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
        <Card style={formStyle} title={t("personalData")}>
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={JSON.parse(localStorage.getItem("user"))}
          >
            <Form.Item label={t("name")} name="name">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label={t("firstSurname")} name="surname1">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label={t("secondSurname")} name="surname2">
              <Input disabled={true} />
            </Form.Item>

            <Form.Item label={t("email")} name="email">
              <Input disabled={true} />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}></Col>
    </Row>
  );
}

export default ProfileView;
