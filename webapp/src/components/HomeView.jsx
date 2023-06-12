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
  marginLeft: "5%",
  marginRight: "10%",
  width: "90%",
  height: "auto",
};

const cardStyle = {
  marginTop: "1%",
  background: "lightgrey",
  border: "lightgrey",
  textAlign: "center",
  fontSize: "36px",
};

const bodyStyle = {
  textAlign: "left",
  fontSize: "16px",
};

const buttonStyle = {
  background: "#001529",
  color: "#fff",
  width: "65%",
  height: "auto",
  fontSize: "20px",
};

const imgStyle = {
  width: "100%",
  height: "auto",
};

const logoStyle = { width: "15%", height: "12%", marginLeft: "40%" };

const { Meta } = Card;

/**
 * The HomeView component displays a carousel of images and a card with text and a button.
 * @returns A React component that displays a carousel of images and a card with text and a button.
 */
function HomeView(props) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const navigateToStartProcess = () => {
    props.accessToken !== "" ? navigate("/process") : navigate("/login");
  };

  const getCarouselItem = (imgSrc, title, description) => {
    return (
      <div>
        <Row style={contentStyle} align={"middle"} justify={"center"}>
          <Col>
            <Card
              style={carouselContentStyle}
              cover={<img style={imgStyle} alt={title} src={imgSrc} />}
            >
              <Meta
                style={carouselContentStyle}
                title={title}
                description={description}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Row gutter={[32, 32]}>
      <Col span={16} xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <Carousel dotPosition="left" effect="fade" autoplay>
          {getCarouselItem(
            "homeimg/processTextExample.jpg",
            t("processHome"),
            t("processHomeDesc")
          )}
          {getCarouselItem(
            "homeimg/selectKeywordsExample.jpg",
            t("keywordsHome"),
            t("keywordsHomeDesc")
          )}
          {getCarouselItem(
            "homeimg/questionsExample.jpg",
            t("questionsHome"),
            t("questionsHomeDesc")
          )}
          {getCarouselItem(
            "homeimg/manageTests.jpg",
            t("manageTests"),
            t("manageTestsDesc")
          )}
        </Carousel>
      </Col>
      <Col span={8} xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
        <Card
          cover={
            <img
              style={logoStyle}
              alt="logo"
              src="homeimg/logo.png"
              href= "https://www.flaticon.es/iconos-gratis/palabras-clave"
            />
          }
          title={"Keywords App"}
          style={cardStyle}
          headStyle={cardStyle}
        >
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
