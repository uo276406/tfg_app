import {
  Button,
  Row,
  Col,
  Alert,
  Space,
  Tag,
  Typography,
  Modal,
  QRCode,
  notification,
  Checkbox,
} from "antd";
import {
  DownloadOutlined,
  LeftOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  CheckOutlined,
  CheckCircleFilled
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

const buttonPdfStyle = {
  background: "red",
  color: "white",
  border: "red",
};

const buttonDocxStyle = {
  background: "blue",
  color: "white",
  border: "blue",
};

const generateButtonStyle = {
  marginRight: "3%",
  marginBottom: "1%",
  fontSize: "1.2em",
};

const { Title, Link, Text, Paragraph } = Typography;
const reactAppUrl = process.env.REACT_APP_WEBAPP_URL;

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
    let connector = new TestsConnector();
    // Llama a la función de la API para guardar el test generado
    await connector
      .addTest(props.accessToken, questions, jumpSelected, showFeedback)
      .then((response) => {
        if (response.detail === "Unauthorized") {
          openNotificationWithIcon("info");
        } else openModal(response.id);
      })
      .catch((error) => {
        openNotificationWithIcon("info");
      });
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: t("sessionExpired"),
      description: t("sessionExpiredDescription"),
    });
  };

  const [api, contextHolder] = notification.useNotification();

  const openModal = (testId) => {
    Modal.success({
      title: (
        <Col>
          <Row justify={"center"}>
            <Title>{t("testGenerated")}</Title>
          </Row>
          <Row justify={"center"}>
            <CheckCircleFilled style={{ fontSize: "3em", color: "green" }} />
          </Row>
        </Col>
      ),
      content: (
        <Col>
          <Row span={24} justify={"center"}>
            <Title level={3} copyable={{ text: testId, tooltips: t("copy") }}>
              {t("testId") + " " + testId}
            </Title>
          </Row>
          <Row span={24} justify={"center"}>
            <QRCode
              iconSize={50}
              value={reactAppUrl + "/test?testId=" + testId}
            />
          </Row>
          <Row span={24} justify={"center"}>
            <Paragraph
              copyable={{
                text: reactAppUrl + "/test?testId=" + testId,
                tooltips: t("copy"),
              }}
            >
              <Text>{"URL: "}</Text>
              <Link href={reactAppUrl + "/test?testId=" + testId}>
                {reactAppUrl + "/test?testId=" + testId}
              </Link>
            </Paragraph>
          </Row>
        </Col>
      ),
      width: "90%",
      okText: t("backButton"),
      icon: null,
    });
  };

  const [jumpSelected, setJumpSelected] = useState(true);
  const [showFeedback, setShowFeedback] = useState(true);

  return (
    <div>
      {contextHolder}
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
        <Tag style={countQuestionsStyle} color="geekblue" id="numberOfQuestions">
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
        <Col xs={24} sm={24} md={19} lg={20} xl={21} xxl={22}>
          <Space>
            <Button
              onClick={() => {
                props.changeStep(1);
              }}
              icon={<LeftOutlined />}
            >
              {t("backButton")}
            </Button>
            <Button
              style={buttonTxtStyle}
              icon={<DownloadOutlined />}
              onClick={() => exportTo(new TxtExporter())}
              disabled={questions.length === 0}
            >
              txt (AIKEN)
            </Button>
            <Button
              style={buttonPdfStyle}
              icon={<FilePdfOutlined />}
              onClick={() => exportTo(new PdfExporter())}
              disabled={questions.length === 0}
            >
              pdf
            </Button>
            <Button
              style={buttonDocxStyle}
              icon={<FileTextOutlined />}
              onClick={() => exportTo(new DocxExporter())}
              disabled={questions.length === 0}
            >
              docx
            </Button>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={5} lg={4} xl={3} xxl={2}>
          <Row>
            <Checkbox onChange={(e) => setJumpSelected(e.target.checked)} checked={jumpSelected}>{t("activateJump")}</Checkbox>
          </Row>
          <Row>
            <Checkbox onChange={(e) => setShowFeedback(e.target.checked)} checked={showFeedback}>{t("showFeedback")}</Checkbox>
          </Row>
        </Col>
      </Row>
      <Row justify={"end"} gutter={[8, 8]} style={generateButtonStyle}>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={generateTest}
            disabled={countQuestions === 0}
            id="generateTestButton"
          >
            {t("generateTest")}
          </Button>
      </Row>
    </div>
  );
}

export default SelectQuestionsForm;
