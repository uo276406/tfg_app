import { Button, Row, Col, Alert, Space, Tag } from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  CheckOutlined
  
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import QuestionCardList from "./QuestionCardList";
import { useState } from "react";
import TxtExporter from "./export/txtexporter";
import PdfExporter from "./export/pdfexporter";
import DocxExporter from "./export/docxexporter";
import TestsConnector from "../../api/testsconnector";

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
};

const countQuestionsStyle = {
  marginLeft: "1.5%",
  marginBottom: "1%",
  fontSize: "1.2em",
};

const buttonTxtStyle = {
  background: "darkgrey",
  color: "black",
  border: "black",
};

/**
 * A functional component that renders a form for selecting questions.
 * @param {{Object}} props - The props object containing the questions to display and a function to change the step.
 * @returns A JSX element that displays the questions and buttons for navigating the form.
 */
function SelectQuestionsForm(props) {
  // Almacena las preguntas por si se editan ---------------------------------------
  let [questions, setQuestions] = useState([...props.questions.questions]);

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
    setCountQuestions(newQuestions.length);
  };

  // Exportación a fichero de texto -------------------------------------------------
  const exportTo = (exporter) => {
    exporter.export(questions);
  };

  const { t } = useTranslation();

  // Contador de preguntas
  const [countQuestions, setCountQuestions] = useState(
    [...props.questions.questions].length
  );

  // Genera test --------------------------------------------------------------------
  const generateTest = async () => {
    console.log("generateTest");
    let connector = new TestsConnector()
    // Llama a la función de la API para guardar el test generado
    await connector.addTest(props.accessToken, questions).then((response) => {
      // Muestra el test generado
    });
  };

  return (
    <div>
      <Row span={24}>
        {props.questions.not_enough_questions_for.length > 0 ? (
          <Alert
            style={alertStyle}
            message={t("notEnoughQuestionsError")}
            description={
              t("notEnoughQuestionsErrorDescription") +
              " " +
              props.questions.not_enough_questions_for.map(
                (keyword) => " " + keyword
              ) +
              "."
            }
            type="error"
            showIcon
            closable
          />
        ) : (
          <></>
        )}
        {props.questions.there_are_repeated ? (
          <Alert
            style={alertStyle}
            message={t("repeatedQuestionsWarningTitle")}
            description={t("repeatedQuestionsWarning")}
            type="warning"
            showIcon
            closable
          />
        ) : (
          <></>
        )}
        <Tag style={countQuestionsStyle} color="geekblue">
          {countQuestions + " " + t("numberOfQuestions")}
        </Tag>
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
        <Col xs={24} sm={24} md={18} lg={21} xl={21} xxl={21}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                props.changeStep(1);
              }}
              icon={<LeftOutlined />}
            >
              {t("backButton")}
            </Button>
            <Button
              ghost
              style={buttonTxtStyle}
              icon={<DownloadOutlined />}
              onClick={() => exportTo(new TxtExporter())}
            >
              txt
            </Button>
            <Button
              type="primary"
              danger
              icon={<FilePdfOutlined />}
              onClick={() => exportTo(new PdfExporter())}
            >
              pdf
            </Button>
            <Button
              type="primary"
              icon={<FileTextOutlined />}
              onClick={() => exportTo(new DocxExporter())}
            >
              docx
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={4} lg={3} xl={3} xxl={3}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={generateTest}
          >
            {t("generateTest")}
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default SelectQuestionsForm;
