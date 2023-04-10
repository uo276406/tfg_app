import QuestionCard from "./QuestionCard";
import { Row, Col } from "antd";

const listStyle = {
  padding: "1%",
  backgroundColor: "white",
  overflow: 'scroll',
  maxHeight: 275
};

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
