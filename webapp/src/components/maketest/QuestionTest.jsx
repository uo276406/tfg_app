import React, { useState } from "react";
import { Card, Typography, Radio, Space, Button } from "antd";
import { ClearOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;

const questionStyle = {
  width: "100%",
  marginRight: "1%",
  marginTop: "1%",
  backgroundColor: "white",
};

const questionTextStyle = {
  whiteSpace: "pre-line",
  fontSize: "18px",
};

function QuestionTest(props) {
  const [value, setValue] = useState(null);

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
        <Paragraph style={questionTextStyle}>{props.questionText}</Paragraph>
      }
      extra={
        <Button onClick={removeOption}>
          <ClearOutlined />
        </Button>
      }
      style={questionStyle}
    >
      <Radio.Group onChange={updateOption} value={value}>
        <Space direction="vertical">
          {props.options.map((o, index) => {
            return (
              <Radio key={index} value={index}>
                {o.value}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </Card>
  );
}

export default QuestionTest;
