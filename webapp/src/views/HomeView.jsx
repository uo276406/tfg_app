import { useNavigate } from "react-router-dom";
import { Row, Col, Carousel, Card, Button } from "antd";
import { useTranslation } from "react-i18next";

const contentStyle = {
  color: "#fff",
  height: "35em",
  background: "#001529",
};

const carouselContentStyle = {
  textAlign: "center",
  borderRadius: "20px",
};

const cardStyle = {
  marginTop: "1%",
  background: "lightgrey",
  border: "lightgrey",
  textAlign: "center",
  fontSize: "40px",
};

const bodyStyle = {
  textAlign: "left",
  fontSize: "16px",
};

const buttonStyle = {
  background: "#001529",
  color: "#fff",
};

const { Meta } = Card;

function HomeView() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  function navigateToStartProcess() {
    navigate("/process");
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={16} xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <Carousel effect="fade" autoplay>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card style={carouselContentStyle} cover={<img alt="Uniovi" src="uniovilogobig.jpg" />}>
                  <Meta
                  style={carouselContentStyle}
                    title={t("uniovi")}
                    description="www.uniovi.es"
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card style={carouselContentStyle} cover={<img alt="EII" src="eiilogobig.jpg" />}>
                  <Meta
                  style={carouselContentStyle}
                    title={t("eii")}
                    description="www.instagram.com"
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle}>
              <Col style={carouselContentStyle} span={12}>
                <h3> {t("processHome")} </h3>
              </Col>
              <Col style={carouselContentStyle} span={12}>
                <h3> </h3>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle}>
              <Col style={carouselContentStyle} span={12}>
                <h3> {t("keywordsHome")} </h3>
              </Col>
              <Col style={carouselContentStyle} span={12}>
                <h3> </h3>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle}>
              <Col style={carouselContentStyle} span={12}>
                <h3> {t("questionsHome")}</h3>
              </Col>
              <Col style={carouselContentStyle} span={12}>
                <h3> </h3>
              </Col>
            </Row>
          </div>
        </Carousel>
      </Col>
      <Col span={8} xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <Card title="Keywords App" style={cardStyle} headStyle={cardStyle}>
          <p style={bodyStyle}>{t("textHome1")}</p>
          <p style={bodyStyle}>{t("textHome2")}</p>
          <Button onClick={navigateToStartProcess} style={buttonStyle}>
            {t("startButton")}
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default HomeView;
