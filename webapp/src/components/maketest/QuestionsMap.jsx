import React from "react";
import { Button, Space } from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  MinusOutlined,
  HomeOutlined,
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

  const getButtonStyle = (questionIndex) => {
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

  const getButtonIcon = (questionIndex) => {
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
  const getButtontype = (questionIndex, index) => {
    if (props.testFinished) return "default";
    if (questionIndex === index) return "primary";
    else return "default";
  };

  return (
    <div style={mapStyle}>
        <Space direction={"vertical"}>
      <Space wrap>
        {props.questions.map((q, index) => {
          return (
            <Button
              disabled={props.testFinished}
              onClick={() => props.updateQuestionIndex(index)}
              type={getButtontype(props.questionIndex, index)}
              key={index}
              icon={getButtonIcon(index)}
              style={getButtonStyle(index)}
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
        <></>
      )}
      </Space>
    </div>
  );
}

export default QuestionMap;
