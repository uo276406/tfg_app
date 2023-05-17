import React from "react";
import { Form, Input, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

const formStyle = {
  textAlign: "center",
  margin: "4%",
};

function ProfileView() {
  const { t } = useTranslation();

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
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
    </Row>
  );
}

export default ProfileView;
