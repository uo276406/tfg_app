import React from "react";
import { Button, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusOutlined,
  HomeOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const mapStyle = {
  backgroundColor: "white",
  marginTop: "4%",
  marginLeft: "2%",
  marginRight: "2%",
  marginBottom: "2%",
  border: "1px solid black",
  padding: "5%",
};

function QuestionMap(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };

  const getButtonCorrectStyle = (questionIndex) => {
    if (props.correction !== null) {
      if (props.correction[questionIndex].is_correct === true) {
        return { backgroundColor: "lightgreen" };
      } else if (props.correction[questionIndex].is_correct === false) {
        return { backgroundColor: "lightcoral" };
      } else {
        return { backgroundColor: "white" };
      }
    }
  };

  const getButtonMakingTestStyle = (questionIndex, index) => {
    if (questionIndex === index) {
      return { backgroundColor: "lightblue" };
    } else if (props.studentCombination[index] !== -1) {
      return { backgroundColor: "lightgrey" };
    }
  };

  const getButtonCorrectIcon = (questionIndex) => {
    if (props.correction !== null) {
      if (props.correction[questionIndex].is_correct === true) {
        return <CheckCircleOutlined></CheckCircleOutlined>;
      } else if (props.correction[questionIndex].is_correct === false) {
        return <CloseOutlined></CloseOutlined>;
      } else {
        return <MinusOutlined></MinusOutlined>;
      }
    }
  };

  return (
    <div style={mapStyle}>
      <Space direction={"vertical"}>
        <Space wrap>
          {props.questions.map((q, index) => {
            return (
              <Button
                disabled={props.testFinished || !props.testJump}
                onClick={() => props.updateQuestionIndex(index)}
                key={q.id}
                icon={getButtonCorrectIcon(index)}
                style={
                  props.testFinished
                    ? getButtonCorrectStyle(index)
                    : getButtonMakingTestStyle(props.questionIndex, index)
                }
              >
                {index + 1}
              </Button>
            );
          })}
        </Space>

        {props.testFinished ? (
          <Button
            type={"primary"}
            onClick={navigateToHome}
            icon={<HomeOutlined />}
          >
            {t("navigateToHome")}
          </Button>
        ) : (
          <Button
            type={"primary"}
            onClick={props.sendSelection}
            icon={<SendOutlined />}
          >
            {t("sendTest")}
          </Button>
        )}
      </Space>
    </div>
  );
}

export default QuestionMap;
