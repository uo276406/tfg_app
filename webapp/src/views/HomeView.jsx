import {useNavigate} from 'react-router-dom';
import { Row, Col, Carousel, Card, Button } from "antd";
import { useTranslation } from "react-i18next";

const contentStyle = {
  color: "#fff",
  lineHeight: "30em",
  textAlign: "center",
  background: "#001529",
  borderRadius: "40px"
};

const cardStyle = {
  marginTop:"1%",
  background: "lightgrey",
  border: "lightgrey",
  textAlign: "center",
  fontSize: "50px"
}

const bodyStyle = {
  textAlign:"left",
  fontSize: "16px"
}

const buttonStyle = {
  background: "#001529",
  color: "#fff"
}

function HomeView() {
  const { t } = useTranslation()

  const navigate = useNavigate()
  function navigateToStartProcess(){
    navigate('/process');
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={16} xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <Carousel effect="fade" autoplay>
          <div>
            <h3 style={contentStyle}> {t("uniovi") + " - " + t("eii")} </h3>
          </div>
          <div>
            <h3 style={contentStyle}>{t("processHome")}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{t("keywordsHome")}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{t("questionsHome")}</h3>
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
