import { Row, Col, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text, Link } = Typography;

const docViewStyle = {
  marginBottom: "2%",
};

const docOptionsStyle = {
  margin: "1%",
};

const docContenStyle = {
  borderRadius: "25px",
  backgroundColor: "white",
  margin: "1%",
};

const descStyle = {
  textAlign: "center",
};

const imgStyle = {
  width: "100%",
  height: "auto",
};

/**
 * The HomeView component displays a carousel of images and a card with text and a button.
 * @returns A React component that displays a carousel of images and a card with text and a button.
 */
function DocView() {
  const { t } = useTranslation();

  return (
    <Row>
      <Col style={docViewStyle} align={"center"} span={24}>
        <Title>{t("doc")}</Title>

        <Text style={descStyle} strong>
          {t("docText1")}
        </Text>
        <br></br>
        <Text style={descStyle} strong>
          {t("docText2")}
        </Text>
        <Link href="https://www.openapis.org/">{t("openApi")}</Link>

        <Row align={"center"} style={docOptionsStyle} gutter={[32, 32]}>
          <Col
            style={docContenStyle}
            xs={24}
            sm={24}
            md={11}
            lg={11}
            xl={11}
            xxl={11}
          >
            <Title level={2}>ReDoc</Title>
            <Link href={process.env.REACT_APP_REDOC}>
              <img style={imgStyle} alt="Redoc" src="docimg/redoc.png"></img>
            </Link>
          </Col>
          <Col
            style={docContenStyle}
            xs={24}
            sm={24}
            md={11}
            lg={11}
            xl={11}
            xxl={11}
          >
            <Title level={2}>Swagger UI</Title>
            <Link href={process.env.REACT_APP_SWAGGER}>
              <img
                style={imgStyle}
                alt="Swagger UI"
                src="docimg/swagger.png"
              ></img>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default DocView;
