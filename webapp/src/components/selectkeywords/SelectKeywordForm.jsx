import { useState } from "react";
import { Button, Row, Col, Spin } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";
import { useTranslation } from "react-i18next";
import QuestionsConnector from "../../api/questionsconnector";

const justifyButtonsBottom = {
  xs: "end",
  sm: "end",
  md: "end",
  lg: "end",
  xl: "end",
  xxl: "end",
};

const keywordsListStyle = {
  paddingRight: "1%",
  paddingLeft: "1%",
};

const buttonsStyle = {
  paddingRight: "2%",
  marginBottom: "1%",
};

/**
 * A form component that allows users to select keywords and generate questions based on them.
 * @param {{object}} props - The props object containing the necessary data for the component.
 * @param {function} props.handleQuestions - A function to handle the generated questions.
 * @param {array} props.keywordsFound - An array of keywords found in the text.
 * @param {string} props.text - The text to generate questions from.
 * @param {function} props.changeStep - A function to change the current step in the parent component.
 * @returns A JSX element that displays the form.
 */
function SelectKeywordsForm(props) {
  const { t } = useTranslation();

  // Botón de generar preguntas -----------------------------------------------
  const [enabledGenerateButton, setEnabledGenerateButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Envía la petición para que la restapi genere preguntas -------------------
  const sendApiMessage = async () => {
    setIsLoading(true);
    console.log(selectedKeywords);
    console.log(totalKeywords);
    let connector = new QuestionsConnector();
    props.handleTotalKeywords(totalKeywords);
    await connector
      .getQuestions(props.text, selectedKeywords)
      .then((questionsFetched) => {
        props.handleQuestions(questionsFetched);
        console.log(questionsFetched)
        setIsLoading(false);
        props.changeStep(2);
      });
  };

  // Almacena palabras seleccionadas y no seleccionadas ----------------------------------------------
  let [selectedKeywords, setSelectedKeywords] = useState([
    ...props.keywordsFound.filter((k) => {
      return k.selected;
    }),
  ]);
  let [totalKeywords, setTotalKeywords] = useState([...props.keywordsFound]);

  const handleKeywordsSelected = (totalKeywords) => {
    setSelectedKeywords([
      ...totalKeywords.filter((k) => {
        return k.selected;
      }),
    ]);
    setTotalKeywords([...totalKeywords]);
  };

  return (
    <div>
      <Spin spinning={isLoading ? true : false}>
        <Row gutter={[16, 16]} style={keywordsListStyle}>
          <Col span={24}>
            <KeywordCardList
              keywordsFound={props.keywordsFound}
              enableGenerateQuestionButton={setEnabledGenerateButton}
              handleKeywordsSelected={handleKeywordsSelected}
              text={props.text}
            />
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
              disabled={!enabledGenerateButton}
              onClick={sendApiMessage}
            >
              {t("generateQuestionsButton")}
            </Button>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default SelectKeywordsForm;
