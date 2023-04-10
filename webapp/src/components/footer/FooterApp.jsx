import Layout from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { Row, Col, Space, Typography, Tag } from "antd";
import {
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  FileFilled,
} from "@ant-design/icons";

const { Text, Link } = Typography;

function FooterApp() {
  const { t } = useTranslation();
  const { Footer } = Layout;

  return (
    <Footer theme="dark">
      <Row gutter={[8, 8]}>
        <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Link href="https://www.uniovi.es/">
              <img src="footerimg/uniovilogo.png" alt={t("uniovi")} />
            </Link>
          </Row>
        </Col>
        <Col span={6} xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Link href="https://ingenieriainformatica.uniovi.es/">
              <img src="footerimg/eiilogo.png" alt={t("eii")} />
            </Link>
          </Row>
        </Col>
        <Col span={6} xs={24} sm={24} md={24} lg={8} xl={8} xxl={6}>
          <Row justify={"center"}>
            <Space direction="vertical">
              <Space>
                <Link href="https://www.linkedin.com/in/diego-gonz%C3%A1lez-su%C3%A1rez-64b2371b1/">
                  <Tag icon={<LinkedinFilled />} color="#55acee">
                    {" "}
                    LinkedIn{" "}
                  </Tag>
                </Link>

                <Link href="https://github.com/uo276406">
                  <Tag icon={<GithubFilled />} color="grey">
                    {" "}
                    Github{" "}
                  </Tag>
                </Link>

                <Link href="mailto:uo276406@uniovi.es">
                  <Tag icon={<MailFilled />} color="#001529">
                    {" "}
                    Email{" "}
                  </Tag>
                </Link>

                <Link href="">
                  <Tag icon={<FileFilled />} color="#3b5999">
                    {" "}
                    {t("tfgdoc")}
                  </Tag>
                </Link>
              </Space>
              <Space>
                <Text> 2023. Diego González Suárez - uo276406 </Text>
              </Space>
            </Space>
          </Row>
        </Col>
      </Row>
    </Footer>
  );
}

export default FooterApp;
