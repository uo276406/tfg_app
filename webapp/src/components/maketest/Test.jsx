import React, { useState } from "react";
import { Row, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import QuestionTest from "./QuestionTest";

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

  const [studentCombination, setStudentCombination] = useState([]);

  const handleUpdateOption = (option, index) => {
    let newStudentCombination = studentCombination;
    newStudentCombination[index] = option;
    setStudentCombination(newStudentCombination);
    console.log(studentCombination);
  };

  const sendSelection = () => {
    console.log(studentCombination);
  };

  return (
    <div>
      <Row justify={"center"} style={studentStyle}>
        <Paragraph>
          <Text>{t("inTestAs")}: </Text>
          <Text strong> {props.student} </Text>
        </Paragraph>
      </Row>
      <Row style={listStyle}>
        {props.testInfo.questions.map((q, index) => {
          return (
            <QuestionTest
              key={index}
              questionText={q.question_text}
              options={q.options}
              index={index}
              handleUpdateOption={handleUpdateOption}
            ></QuestionTest>
          );
        })}
      </Row>
      <Row justify={"end"} style={buttonStyle}>
        <Button type={"primary"} onClick={sendSelection}>
          {t("sendTest")}
        </Button>
      </Row>
    </div>
  );
}

export default Test;
