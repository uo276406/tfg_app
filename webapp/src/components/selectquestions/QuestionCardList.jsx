import QuestionCard from "./QuestionCard";
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
  return (
    <div>
      <Col span={24}>
        <Row style={listStyle}>
          {props.questions.map((q, index) => {
            return (
              <QuestionCard
                key={index}
                questionText={q.question}
                options={q.options}
              />
            );
          })}
        </Row>
      </Col>
    </div>
  );
}

export default QuestionCardList;
