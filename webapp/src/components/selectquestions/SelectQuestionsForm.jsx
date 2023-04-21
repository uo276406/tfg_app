import { Button, Row, Col, Alert } from "antd";
import { DownloadOutlined, LeftOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import QuestionCardList from "./QuestionCardList";
import { useState } from "react";

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

const alertStyle = {
  width: "100%",
  marginLeft: "1.5%",
  marginRight: "1.5%",
  marginBottom: "1.5%",
}

/**
 * A functional component that renders a form for selecting questions.
 * @param {{Object}} props - The props object containing the questions to display and a function to change the step.
 * @returns A JSX element that displays the questions and buttons for navigating the form.
 */
function SelectQuestionsForm(props) {

  // Almacena las preguntas por si se editan ---------------------------------------
  let [questions, setQuestions] = useState([...props.questions.questions])

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  }

  // Exportación a fichero de texto -------------------------------------------------
  const exportToTxt = () => {
    let text = "";
    questions.forEach((question) => {
      if (question.question) {
        text += question.question + "\r\n";
        question.options.forEach((option) => { text += option.value +  (option.correct ? " T " : " F ") + "\r\n"; });
      }
      text += "\r\n";
    });
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "questions.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const { t } = useTranslation();

  return (
    <div>
      <Row span={24}>
        {
        props.questions.there_are_repeated ? <Alert
        style={alertStyle}
          message={t("repeatedQuestionsWarningTitle")}
          description={t("repeatedQuestionsWarning")}
          type="warning"
          showIcon
          closable
        /> : <></>}
      </Row>
      <Row gutter={[16, 16]} style={questionsListStyle}>
        <Col span={24}>
          <QuestionCardList
            questions={questions}
            updateQuestions={updateQuestions}
          ></QuestionCardList>
        </Col>
      </Row>
      <Row justify={justifyButtonsBottom} gutter={[8, 8]} style={buttonsStyle}>
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
          <Button type="primary" icon={<DownloadOutlined />} onClick={exportToTxt}>
            {t("exportTxtButton")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectQuestionsForm;
