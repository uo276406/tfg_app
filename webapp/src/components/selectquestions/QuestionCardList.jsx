import QuestionCard from "./QuestionCard";
import { Row, Col } from "antd";

const listStyle = {
  padding: "1%",
  borderRadius: "15px",
  backgroundColor: "white",
};

function QuestionCardList(props) {
  return (
    <div>
      <Col span={24}>
        <Row style={listStyle}>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
          <QuestionCard></QuestionCard>
        </Row>
      </Col>
    </div>
  );
}

export default QuestionCardList;
