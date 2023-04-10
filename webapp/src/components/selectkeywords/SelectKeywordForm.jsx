import { useState } from "react";
import { Button, Row, Col } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";
import { useTranslation } from "react-i18next";
import QuestionsConnector from "../../api/questionsconnector";

const justifyButtonsBottom = {
  xs: "center",
  sm: "center",
  md: "end",
  lg: "end",
  xl: "end",
  xxxl: "end",
};

const keywordsListStyle = {
  paddingRight: "1%",
  paddingLeft: "1%",
};

const buttonsStyle = {
  paddingRight: "2%",
  marginBottom: "1%",
};

function SelectKeywordsForm(props) {
  const { t } = useTranslation();

  // Botón de generar preguntas -----------------------------------------------
  const [enabledGenerateButton, setEnabledGenerateButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Envía la petición para que la restapi genere preguntas -------------------
  const sendApiMessage = async () => {
    setIsLoading(true);
    let connector = new QuestionsConnector(props.text, selectedKeywords);
    await connector.getQuestions().then((questionsFetched) => {
      props.handleQuestions(questionsFetched);
      setIsLoading(false);
      props.changeStep(2);
    });
  };

  // Almacena palabras seleccionadas ----------------------------------------------
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const handleKeywordsSelected = (selectedKeywords) => {
    setSelectedKeywords([
      ...selectedKeywords.map((k) => {
        return { value: k.value };
      }),
    ]);
  }

  return (
    <div>
      <Row gutter={[16, 16]} style={keywordsListStyle}>
        <Col span={24}>
          <KeywordCardList
            keywordsFound={props.keywordsFound}
            enableGenerateQuestionButton={setEnabledGenerateButton}
            handleKeywordsSelected={handleKeywordsSelected}
          />
        </Col>
      </Row>
      <Row justify={justifyButtonsBottom} gutter={[8, 8]} style={buttonsStyle}>
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
            loading={isLoading}
            disabled={!enabledGenerateButton}
            onClick={sendApiMessage}
          >
            {t("generateQuestionsButton")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectKeywordsForm;
