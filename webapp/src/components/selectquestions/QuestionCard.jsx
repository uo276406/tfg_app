import { useState } from "react";
import { Card, Typography } from "antd";

const { Paragraph } = Typography;

const questionCardStyle = {
  width: "100%",
  paddingTop: "1%",
  margin: "1%",
};

function QuestionCard(props) {
  // Enucnciado ------------------------------------------------------------------
  const [questionAnswer, setQuestionAnswer] = useState("Enunciado");

  // Opciones --------------------------------------------------------------------
  const [options, setOptions] = useState([]);

  return (
    <Card
      size="small"
      title={
        <Paragraph
          editable={{
            onChange: setQuestionAnswer,
          }}
        >
          {questionAnswer}
        </Paragraph>
      }
      style={questionCardStyle}
    >
      <Paragraph
        delete = {true}
        editable={{
          onChange: () => {
            return;
          },
        }}
      >
        {"Opción A"}
      </Paragraph>
      <Paragraph
        editable={{
          onChange: () => {
            return;
          },
        }}
      >
        {"Opción B"}
      </Paragraph>
    </Card>
  );
}

export default QuestionCard;
