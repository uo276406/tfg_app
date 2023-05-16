import React, { useState } from "react";
import { Row, Button, message, Col, Descriptions, Badge, Modal, Typography } from "antd";
import { useTranslation } from "react-i18next";
import QuestionTest from "./QuestionTest";
import TestsConnector from "../../api/testsconnector";
import QuestionsMap from "./QuestionsMap";
import { LeftOutlined, RightOutlined, CheckCircleFilled } from "@ant-design/icons";
import StudentQuestionConnector from "../../api/studentquestionsconnector";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const listStyle = {
  paddingLeft: "2%",
  paddingRight: "2%",
  paddingBottom: "1%",
};

const studentStyle = {
  paddingLeft: "2%",
  paddingRight: "2%",
  paddingTop: "1%",
};

const buttonStyle = { marginRight: "3%", marginLeft: "2%", marginBottom: "2%" };

function Test(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleUpdateOption = (option, index) => {
    let newStudentCombination = props.studentCombination;
    newStudentCombination[index] = option;
    props.handleSetStudentCombination(newStudentCombination);

    let studentQuestionConnector = new StudentQuestionConnector();

    studentQuestionConnector
      .updateStudentQuestion(
        props.student,
        props.testInfo.questions[index].id,
        option
      )
      .then((response) => {
        console.log(response);
      });

    // Actualizar pregunta contestada
  };

  const [testFinished, setTestFinished] = useState(false);
  const [testResults, setTestResults] = useState(); // [ {questionId: 1, optionId: 2}, ...
  const sendSelection = () => {
    console.log(props.studentCombination);
    let testConnector = new TestsConnector();
    testConnector
      .checkAndSaveTest(props.testId, props.student, props.studentCombination)
      .then((response) => {
        if(!props.testInfo.feedback) {
          openModal();
        }
        else {
          if (
          response.detail !== undefined &&
          response.detail === "Test is closed"
        ) {
          message.error(t("closedTest"));
        } else {
          message.success(t("testSent"));
          setTestResults(response);
          setTestFinished(true);
        }
      }});
  };

  const openModal = () => {
    Modal.success({
      title: (
        <Col>
          <Row justify={"center"}>
            <Title>{t("testSent")}</Title>
          </Row>
          <Row justify={"center"}>
            <CheckCircleFilled style={{ fontSize: "3em", color: "green" }} />
          </Row>
        </Col>
      ),
      icon: null,
      width: "50%",
      okText: t("navigateToHome"),
      onOk: () => {
        navigate("/");
      },
    });
  };

  const [index, setIndex] = useState(0);
  const getQuestionIndex = (index) => {
    let q = props.testInfo.questions[index];
    return (
      <QuestionTest
        key={index}
        questionText={q.question_text}
        studentCombinationIndex={props.studentCombination[index]}
        options={q.options}
        index={index}
        handleUpdateOption={handleUpdateOption}
        correction={testResults ? testResults.correction[index] : null}
        testFinished={testFinished}
      ></QuestionTest>
    );
  };

  const updateQuestionIndex = (index) => {
    setIndex(index);
  };

  const getBadgeStatus = () => {
    if (testFinished) {
      if (testResults.base10_score >= 5) {
        return "success";
      } else {
        return "error";
      }
    } else {
      return "processing";
    }
  };

  const getBadgeText = () => {
    if (testFinished) {
      if (testResults.base10_score >= 5) {
        return t("passed");
      } else {
        return t("failed");
      }
    } else {
      return t("inProgress");
    }
  };

  const labelStyles = {
    fontSize: "1em",
    fontWeight: "bold",
  };

  const getpreviousButton = () => {
    return (
      <Button
        type={"primary"}
        onClick={() => {
          setIndex(index - 1);
        }}
        disabled={index === 0}
        icon={<LeftOutlined />}
      >
        {t("previousQuestion")}
      </Button>
    );
  };

  const getNextQuestionButton = () => {
    return (
      <Button
        type={"primary"}
        onClick={() => setIndex(index + 1)}
        icon={<RightOutlined />}
        disabled={index === props.testInfo.questions.length - 1}
      >
        {t("nextQuestion")}
      </Button>
    );
  };

  return (
    <div>
      <Row justify={"start"} style={studentStyle}>
        <Descriptions bordered>
          <Descriptions.Item labelStyle={labelStyles} label={t("inTestAs")}>
            {props.student}
          </Descriptions.Item>
          {testFinished ? (
            <Descriptions.Item labelStyle={labelStyles} label={t("testScore")}>
              {" "}
              {testResults.score + "/" + testResults.max_score + " -- " + testResults.base10_score + "/10"}
            </Descriptions.Item>
          ) : (
            <></>
          )}
          <Descriptions.Item labelStyle={labelStyles} label={t("markSummary")}>
            <Badge status={getBadgeStatus()} text={getBadgeText()} />
          </Descriptions.Item>
        </Descriptions>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
          <Row style={listStyle}>
            {!testFinished ? (
              <>{getQuestionIndex(index)}</>
            ) : (
              props.testInfo.questions.map((q, index) => {
                return getQuestionIndex(index);
              })
            )}
          </Row>
          {!testFinished ? (
            <Row style={buttonStyle}>
              <Col span={12}>{getpreviousButton()}</Col>
              <Col span={12}>
                <Row justify={"end"}>{getNextQuestionButton()}</Row>
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Col>
        <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
          <QuestionsMap
            questions={props.testInfo.questions}
            studentCombination={props.studentCombination}
            questionIndex={index}
            updateQuestionIndex={updateQuestionIndex}
            testFinished={testFinished}
            testJump={props.testInfo.jump}
            correction={testResults ? testResults.correction : null}
            sendSelection={sendSelection}
          ></QuestionsMap>
        </Col>
      </Row>
    </div>
  );
}

export default Test;
