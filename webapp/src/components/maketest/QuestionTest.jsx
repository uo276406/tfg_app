import React, { useState } from "react";
import { Card, Typography, Radio, Space, Button, Tag } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const questionTextStyle = {
  whiteSpace: "pre-line",
  fontSize: "18px",
};

const tagNumberStyle = { fontSize: "1.3em" };

function QuestionTest(props) {
  let correctionColor =
    props.correction !== null && props.correction.is_correct
      ? "#B1FFCA"
      : "#ffccc7";

  const questionStyle = {
    width: "100%",
    marginRight: "1%",
    marginTop: "1%",
    backgroundColor:
      props.correction === null || props.correction.is_correct === null
        ? "white"
        : correctionColor,
  };

  const [value, setValue] = useState(props.studentCombinationIndex);

  const updateOption = (e) => {
    setValue(e.target.value);
    props.handleUpdateOption(e.target.value, props.index);
  };

  const removeOption = () => {
    setValue(-1);
    props.handleUpdateOption(-1, props.index);
  };

  return (
    <Card
      title={
        <Space align={"center"}>
          <Tag style={tagNumberStyle}>{props.index + 1}</Tag>
          <Paragraph style={questionTextStyle}>{props.questionText}</Paragraph>
        </Space>
      }
      extra={
        <div>
          <Button onClick={removeOption} disabled={props.testFinished}>
            <ClearOutlined />
          </Button>
          <div>
            {props.correction !== null ? props.correction.addedScore : <></>}
          </div>
        </div>
      }
      style={questionStyle}
    >
      <Radio.Group onChange={updateOption} value={value}>
        <Space direction="vertical">
          {props.options.map((o, index) => {
            return (
              <Radio
                key={index}
                value={index}
                disabled={props.testFinished}
              >
                {props.correction !== null &&
                props.correction.correctOption === index ? (
                  <div>{o.value + " ✅"}</div>
                ) : (
                  o.value
                )}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Card>
  );
}

export default QuestionTest;