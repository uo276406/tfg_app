import QuestionCard from "./QuestionCard";
import { useState } from "react";
import { Row, Col } from "antd";

const listStyle = {
  padding: "1%",
  backgroundColor: "white",
  overflow: 'scroll',
  maxHeight: 275
};

/**
 * A functional component that renders a list of QuestionCard components.
 * @param {{questions: Array<{question: string, options: Array<string>}>}} props - An object containing an array of question objects, each with a question string and an array of options.
 * @returns A div containing a list of QuestionCard components.
 */
function QuestionCardList(props) {

  let [questions, setQuestions] = useState([...props.questions])

  const updateQuestion = (index, questionText, options) => {
    setQuestions(questions.forEach((q, i) => {
      if (i === index) {
        q.question = questionText;
        q.options = options;
      }
    }));
  }

  return (
    <div>
      <Col span={24}>
        <Row style={listStyle}>
          {questions.map((q, index) => {
            return (
              <QuestionCard
                key={index}
                questionText={q.question}
                options={q.options}
                updateQuestion={updateQuestion}
              />
            );
          })}
        </Row>
      </Col>
    </div>
  );
}

export default QuestionCardList;
