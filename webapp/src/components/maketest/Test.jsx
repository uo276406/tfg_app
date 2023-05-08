import React, { useState } from "react";
import { Row, Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import QuestionTest from "./QuestionTest";
import TestsConnector from "../../api/testsconnector";
import { useNavigate } from "react-router-dom";

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

const buttonStyle = { marginRight: "3%", marginBottom: "2%" };

const { Text, Paragraph } = Typography;

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
  };

  const [testFinished, setTestFinished] = useState(false);
  const [testResults, setTestResults] = useState(); // [ {questionId: 1, optionId: 2}, ...
  const sendSelection = () => {
    console.log(studentCombination);
    let testConnector = new TestsConnector();
    testConnector
      .checkTest(props.testId, props.student, studentCombination)
      .then((response) => {
        if (response.detail !== undefined && response.detail === "Test is closed") {
          message.error(t("closedTest"));
          return;
        } else {
          message.success(t("testSent"));
          setTestResults(response);
          setTestFinished(true);
        }
      });
  };

  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Row justify={"center"} style={studentStyle} span={24}>
        <Paragraph>
          <Text>{t("inTestAs")}: </Text>
          <Text strong> {props.student} </Text>
        </Paragraph>
      </Row>
      {testResults ? (
        <Row justify={"center"} style={studentStyle} span={24}>
          <Paragraph>
            <Text>{t("testScore")}:</Text>
            <Text strong>
              {" "}
              {testResults.score + "/" + testResults.max_score}
            </Text>
          </Paragraph>
        </Row>
      ) : (
        <></>
      )}
      <Row style={listStyle}>
        {props.testInfo.questions.map((q, index) => {
          return (
            <QuestionTest
              key={index}
              questionText={q.question_text}
              options={q.options}
              index={index}
              handleUpdateOption={handleUpdateOption}
              correction={testResults ? testResults.correction[index] : null}
              testFinished={testFinished}
            ></QuestionTest>
          );
        })}
      </Row>
      <Row justify={"end"} style={buttonStyle}>
        <Button
          type={"primary"}
          onClick={!testFinished ? sendSelection : navigateToHome}
        >
          {!testFinished ? t("sendTest") : t("navigateToHome")}
        </Button>
      </Row>
    </div>
  );
}

export default Test;
