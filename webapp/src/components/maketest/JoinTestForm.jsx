import React, { useState } from "react";
import { Button, Form, Input, Card, Col, Row, Alert } from "antd";
import { useTranslation } from "react-i18next";
import TestsConnector from "../../api/testsconnector";
import StudentsConnector from "../../api/studentconnector";
import StudentQuestionConnector from "../../api/studentquestionsconnector";

const loginStyle = {
  margin: "2%",
};

const formStyle = {
  textAlign: "center",
};

const alertStyle = {
  width: "100%",
  marginRight: "1.5%",
  marginBottom: "1.5%",
};

/**
 * A functional component that renders a login form.
 * @param {{object}} props - The props object that contains the sendLoginToConsole function.
 * @returns A JSX element that renders a login form.
 */
function JoinTestForm(props) {
  const { t } = useTranslation();

  const showAlert = (text, textDescription) => {
    return (
      <Alert
        style={alertStyle}
        message={text}
        description={textDescription}
        type="error"
        showIcon
      />
    );
  };

  const [testNotFound, setTestNotFound] = useState(false);
  const [userFinishedTheTest, setUserFinishedTheTest] = useState(false);
  const [closedTest, setClosedTest] = useState(false);

  const loadLastCombination = async (
    studentQuestionConnector,
    studentId,
    test
  ) => {
    let lastCombination = [];
    for (const element of test.questions) {
      lastCombination.push(
        await studentQuestionConnector.getStudentCombination(
          studentId,
          element.id
        )
      );
    }
    props.handleSetStudentCombination(lastCombination);
  };

  const loadInitialCombination = async (
    studentQuestionConnector,
    studentId,
    test
  ) => {
    for (const element of test.questions) {
      await studentQuestionConnector.addStudentQuestion(
        studentId,
        element.id,
        -1
      );
    }
    props.handleSetStudentCombination(test.questions.map((question) => -1));
  };

  const stepIntoTest = async (values) => {
    let studentConnector = new StudentsConnector();
    let testConnector = new TestsConnector();
    let studentQuestionConnector = new StudentQuestionConnector();
    let test = await testConnector.getTest(values.testId);
    if (test.detail !== undefined && test.detail === "Test not found") {
      setTestNotFound(true);
    } else if (test.detail !== undefined && test.detail === "Test is closed") {
      setClosedTest(true);
    }
    // Comprobar si el usuario ha terminado el test o si no lo ha completado aún
    else {
      let responseAdded = await studentConnector.addStudent(
        values.studentId,
        values.testId
      );
      if (
        responseAdded.message !== undefined &&
        responseAdded.message === "Student already finished test"
      ) {
        setUserFinishedTheTest(true);
        return;
      } else if (
        responseAdded.message !== undefined &&
        responseAdded.message === "Student already exists in test"
      ) {
        await loadLastCombination(
          studentQuestionConnector,
          values.studentId,
          test
        );
      } else {
        // Inicializa en la base de datos las preguntas del estudiante
        await loadInitialCombination(
          studentQuestionConnector,
          values.studentId,
          test
        );
      }
      props.handleSetStudent(values.studentId);
      props.handleSetTestInfo(test, values.testId);
      props.handleStep(1);
    }
  };

  return (
    <Row style={loginStyle}>
      <Col span={24}>
        {testNotFound
          ? showAlert(t("testNotFound"), t("testNotFoundDescription"))
          : null}
        {userFinishedTheTest
          ? showAlert(t("studentFinished"), t("studentFinishedDescription"))
          : null}
        {closedTest
          ? showAlert(t("closedTest"), t("closedTestDescription"))
          : null}
        <Card
          style={formStyle}
          title={t("joinTestTitle")}
          headStyle={{ textAlign: "center" }}
        >
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true, testId: props.testId }}
            autoComplete="off"
            onFinish={stepIntoTest}
          >
            <Form.Item
              label={t("testId")}
              name="testId"
              rules={[{ required: true, message: t("testIdCompulsory") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={t("studentId")}
              name="studentId"
              rules={[{ required: true, message: t("studentIdCompulsory") }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: { offset: 0 },
                sm: { offset: 8, span: 24 / 3 },
              }}
            >
              <Button type="primary" htmlType="submit" id="joinTest" block>
                {t("joinTest")}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default JoinTestForm;
