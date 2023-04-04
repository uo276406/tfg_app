import { useState } from "react";
import { Button, Row, Col } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";
import { useTranslation } from "react-i18next";


const justifyButtonsBottom = {
  xs: "center",
  sm: "center",
  md: "end",
  lg: "end",
  xl: "end",
  xxxl: "end",
};

function SelectKeywordsForm(props) {

  const { t } = useTranslation();

  // Botón de generar preguntas -----------------------------------------------
  const [enabledGenerateButton, setEnabledGenerateButton] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        
        props.changeStep(2);
        
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ paddingBottom: "2%" }}>
        <Col span={24}>
          <KeywordCardList
            keywordsFound={props.keywordsFound.map((k) => {
              return { key: k.index, value: k.value, selected: false };
            })}
            enableGenerateQuestionButton={setEnabledGenerateButton}
          />
        </Col>
      </Row>
      <Row
        justify={justifyButtonsBottom}
        gutter={[8, 8]}
        style={{ paddingBottom: "1%" }}
      >
        <Col>
          <Button
            type="primary"
            onClick={() => {
              props.changeStep(0);
            }}
            icon={<LeftOutlined />}
          >
            {t("backButton")}
          </Button>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<RightOutlined />}
            loading={loadings[0]}
            disabled={!enabledGenerateButton}
            onClick={() => enterLoading(0)}
          >
            {t("generateQuestionsButton")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectKeywordsForm;
