import { useNavigate } from "react-router-dom";
import { Row, Col, Carousel, Card, Button } from "antd";
import { useTranslation } from "react-i18next";

const contentStyle = {
  color: "#fff",
  height: "37em",
  background: "#001529",
};

const carouselContentStyle = {
  textAlign: "center",
  borderRadius: "20px",
  marginLeft: "10%",
  marginRight: "10%",

};

const cardStyle = {
  marginTop: "5%",
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
        <Carousel dotPosition="left" effect="fade" autoplay>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card
                  style={carouselContentStyle}
                  cover={<img alt="Uniovi" src="homeimg/uniovilogobig.jpg" />}
                >
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card
                  style={carouselContentStyle}
                  cover={<img alt="EII" src="homeimg/eiilogobig.jpg" />}
                >
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card
                  style={carouselContentStyle}
                  cover={<img alt="Process text example" src="homeimg/processTextExample.jpg" />}
                >
                  <Meta style={carouselContentStyle} title={t("processHome")} description={t("processHomeDesc")} />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card
                  style={carouselContentStyle}
                  cover={<img alt="Select kewywords example" src="homeimg/selectKeywordsExample.jpg" />}
                >
                  <Meta
                    style={carouselContentStyle}
                    title={t("keywordsHome")}
                    description={t("keywordsHomeDesc")}
                  />
                </Card>
              </Col>
            </Row>
          </div>
          <div>
            <Row style={contentStyle} align={"middle"} justify={"center"}>
              <Col>
                <Card
                  style={carouselContentStyle}
                  cover={<img alt="Select questions example" src="homeimg/selectQuestionsExample.jpg" />}
                >
                  <Meta
                    style={carouselContentStyle}
                    title={t("questionsHome")}
                    description={t("questionsHomeDesc")}
                  />
                </Card>
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
