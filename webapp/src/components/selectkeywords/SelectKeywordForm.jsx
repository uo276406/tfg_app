import { useState } from "react";
import { Button, Row, Col } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";
import { useTranslation } from "react-i18next";
/**
 * A form component for editing a keyword. Displays a modal with a form that allows the user to modify the keyword.
 * @param {{object}} props - The props object containing the following properties:
 *   - visible: A boolean indicating whether the modal is visible or not.
 *   - onCancel: A function to be called when the user cancels the form.
 *   - onModify: A function to be called when the user modifies the keyword.
 *   - fields: An array of objects representing the fields in the form.
 *   - form: The antd form object used to manage the form state.
 * @returns A modal containing a form for editing a keyword.
 */
import QuestionsConnector from "../../api/questionsconnector";

const justifyButtonsBottom = {
  xs: "center",
  sm: "center",
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
    let connector = new QuestionsConnector(props.text, selectedKeywords);
    console.log(selectedKeywords)
    await connector.getQuestions().then((questionsFetched) => {
      props.handleQuestions(questionsFetched);
      setIsLoading(false);
      props.changeStep(2);
    });
  };

  // Almacena palabras seleccionadas ----------------------------------------------

  let [selectedKeywords, setSelectedKeywords] = useState([]);

  const handleKeywordsSelected = (selectedKeywords) => {
    setSelectedKeywords([
      ...selectedKeywords.map((k) => {
        return { value: k.value };
      }),
    ]);
  };

  return (
    <div>
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
