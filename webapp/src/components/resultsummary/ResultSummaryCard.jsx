import React, { useState } from "react";
import { Tag, Space } from "antd";

const studentStyle = {
    fontSize: "1em",
};

function ResultSummaryCard(props) {
  const [colorScore, setColorScore] = useState(
    props.student.score >= props.student.max_score/2 ? "green" : "red"
  );

  return (
    <div style={studentStyle}>
      <Space>
        {props.student.id + " ---"}
        <Tag color={colorScore}>
          {props.student.score + "/" + props.student.max_score}
        </Tag>
      </Space>
    </div>
  );
}

export default ResultSummaryCard;
