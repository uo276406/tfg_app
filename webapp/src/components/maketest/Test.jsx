import React, { useState } from "react";
import { Row, Button, message, Col, Descriptions, Badge } from "antd";
import { useTranslation } from "react-i18next";
import QuestionTest from "./QuestionTest";
import TestsConnector from "../../api/testsconnector";
import QuestionsMap from "./QuestionsMap";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import StudentQuestionConnector from "../../api/studentquestionsconnector";

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

  const [studentCombination, setStudentCombination] = useState(
    props.testInfo.questions.map((q) => -1)
  );

  const handleUpdateOption = (option, index) => {
    let newStudentCombination = studentCombination;
    newStudentCombination[index] = option;
    setStudentCombination(newStudentCombination);
    console.log(studentCombination);

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
    console.log(studentCombination);
    let testConnector = new TestsConnector();
    testConnector
      .checkTest(props.testId, props.student, studentCombination)
      .then((response) => {
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
      });
  };

  const [index, setIndex] = useState(0);
  const getQuestionIndex = (index) => {
    let q = props.testInfo.questions[index];
    return (
      <QuestionTest
        key={index}
        questionText={q.question_text}
        studentCombinationIndex={studentCombination[index]}
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
      if (testResults.score >= testResults.max_score / 2) {
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
      if (testResults.score >= testResults.max_score / 2) {
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
              {testResults.score + "/" + testResults.max_score}{" "}
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
        <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
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
        <Col xs={24} sm={24} md={5} lg={5} xl={5} xxl={5}>
          <QuestionsMap
            questions={props.testInfo.questions}
            studentCombination={studentCombination}
            questionIndex={index}
            updateQuestionIndex={updateQuestionIndex}
            testFinished={testFinished}
            correction={testResults ? testResults.correction : null}
            sendSelection={sendSelection}
          ></QuestionsMap>
        </Col>
      </Row>
    </div>
  );
}

export default Test;
