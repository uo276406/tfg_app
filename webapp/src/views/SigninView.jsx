import React from "react";
import { Button, Form, Input, Card, Col, Row } from "antd";

function SigninView() {
  return (
    <Row style={{ marginTop: 34, marginBottom: 34, height: "100%" }}>
      <Col span={24} style={{ height: "100%" }}>
        <Card>
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Introduzca su nombre" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Primer apellido"
              name="surname1"
              rules={[
                { required: true, message: "Introduzca su primer apellido" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Segundo apellido"
              name="surname2"
              rules={[
                { required: false, message: "Introduzca su segundo apellido" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Introduzca su email" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[{ required: true, message: "Introduzca su contraseña" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Corfime su contraseña"
              name="passwordConfirm"
              rules={[{ required: true, message: "Repita su contraseña" }]}
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
                Registrarse
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default SigninView;
