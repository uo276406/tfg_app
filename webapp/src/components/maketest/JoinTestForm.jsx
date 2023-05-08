import React, {useState} from "react";
import { Button, Form, Input, Card, Col, Row, Alert } from "antd";
import { useTranslation } from "react-i18next";
import TestsConnector from "../../api/testsconnector";
import StudentsConnector from "../../api/studentconnector";

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
}

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
  }

  const [testNotFound, setTestNotFound] = useState(false);
  const [studentInTest, setStudentInTest] = useState(false);
  const [closedTest, setClosedTest] = useState(false);

  const stepIntoTest = async (values) => {
    let studentConnector = new StudentsConnector();
    let testConnector = new TestsConnector()
    let test = await testConnector.getTest(values.testId)
    let student = await studentConnector.findStudentInTest(values.studentId, values.testId)
    if(test.detail !== undefined && test.detail === "Test not found"){
      setTestNotFound(true);
      setStudentInTest(false);
      setClosedTest(false);
    }
    else if (student.detail !== undefined && student.detail === "User registered in test"){
      setTestNotFound(false);
      setStudentInTest(true);
      setClosedTest(false);
    }
    else if(test.detail !== undefined && test.detail === "Test is closed"){
      setTestNotFound(false);
      setStudentInTest(false);
      setClosedTest(true);
    }
    else{
      props.handleSetStudent(values.studentId);
      props.handleSetTestInfo(test, values.testId)
      props.handleStep(1);
    }
    
  }

  return (
    <Row style={loginStyle}>
      <Col span={24}>
        {testNotFound ? showAlert(t("testNotFound"), t("testNotFoundDescription")) : null}
        {studentInTest ? showAlert(t("studentInTest"), t("studentInTestDescription")) : null}
        {closedTest ? showAlert(t("closedTest"), t("closedTestDescription")) : null}
        <Card
          style={formStyle}
          title={t("joinTestTitle")}
          headStyle={{ textAlign: "center" }}
          
        >
          <Form
            name="basic"
            labelCol={{ span: 24 / 3 }}
            wrapperCol={{ span: 24 / 3 }}
            initialValues={{ remember: true }}
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
              rules={[
                { required: true, message: t("studentIdCompulsory") },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: { offset: 0 },
                sm: { offset: 8, span: 24 / 3 },
              }}
            >
              <Button type="primary" htmlType="submit" block>
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
