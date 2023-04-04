import Layout from "antd/es/layout/layout";
import { Row, Col, Space, Typography, Tooltip } from "antd";
import {
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  FileFilled,
} from "@ant-design/icons";

const { Text, Link } = Typography;

function FooterApp() {
  const { Footer } = Layout;

  return (
    <Footer theme="dark">
      <Row gutter={[8, 8]}>
        <Col span={6} xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Link href="https://www.uniovi.es/">
              <img src="uniovilogo.png" alt="Universidad de Oviedo" />
            </Link>
          </Row>
        </Col>
        <Col span={6} xs={24} sm={12} md={8} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Link href="https://ingenieriainformatica.uniovi.es/">
              <img src="eiilogo.png" alt="Escuela de Ingeniería Informática" />
            </Link>
          </Row>
        </Col>
        <Col span={6} xs={24} sm={24} md={8} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Space direction="vertical">
              <Space>
                <Text strong> Información personal: </Text>
                <Tooltip title="Perfil de LinkedIn">
                  <Link href="https://www.linkedin.com/in/diego-gonz%C3%A1lez-su%C3%A1rez-64b2371b1/">
                    <LinkedinFilled />
                  </Link>
                </Tooltip>
                <Tooltip title="Perfil de Github">
                  <Link href="https://github.com/uo276406">
                    <GithubFilled />
                  </Link>
                </Tooltip>
                <Tooltip title="Correo electrónico">
                  <Link href="mailto:uo276406@uniovi.es">
                    <MailFilled />
                  </Link>
                </Tooltip>
                <Tooltip title="Memoria TFG">
                <Link href="https://github.com/uo276406">
                  <FileFilled />
                </Link>
                </Tooltip>
              </Space>
              <Space>
                <Text strong> Diego González Suárez - uo276406 </Text>
              </Space>
            </Space>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterApp;
