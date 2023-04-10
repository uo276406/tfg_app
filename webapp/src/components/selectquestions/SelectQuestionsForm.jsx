import { Button, Row, Col } from "antd";
import { DownloadOutlined, LeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import QuestionCardList from "./QuestionCardList";

const justifyButtonsBottom = {
  xs: "center",
  sm: "center",
  md: "start",
  lg: "start",
  xl: "start",
  xxxl: "start",
};

const questionsListStyle = {
  paddingRight: "1%",
  paddingLeft: "1%",
};

const buttonsStyle = {
  paddingLeft: "2%",
  paddingTop: "1%",
  marginBottom: "1%",
};

function SelectQuestionsForm(props) {
  const { t } = useTranslation();

  return (
    <div>
      <Row gutter={[16, 16]} style={questionsListStyle}>
        <Col span={24}>
          <QuestionCardList questions={props.questions}></QuestionCardList>
        </Col>
      </Row>
      <Row
        justify={justifyButtonsBottom}
        gutter={[8, 8]}
        style={buttonsStyle}
      >
        <Col>
          <Button
            type="primary"
            onClick={() => {
              props.changeStep(1);
            }}
            icon={<LeftOutlined />}
          >
            {t("backButton")}
          </Button>
        </Col>
        <Col>
          <Button type="primary" icon={<DownloadOutlined />}>
            {t("exportButton")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectQuestionsForm;
