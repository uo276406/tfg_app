import { useState, useEffect, useRef } from "react";
import { Card, Typography, Tag, Input, Space, Tooltip, theme } from "antd";
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined  } from "@ant-design/icons";

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
  const { token } = theme.useToken();
  const [tags, setTags] = useState([
    ...props.options.map((o) => {
      return o.value;
    }),
  ]);
  const [corrects, setCorrects] = useState([
    ...props.options.map((o) => {
      return o.correct;
    }),
  ]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Card
      size="small"
      title={
        <Paragraph
          editable={{
            onChange: setQuestionAnswer,
          }}
        >
          {props.questionText}
        </Paragraph>
      }
      style={questionCardStyle}
    >
      <Space size={[0, 8]} wrap>
        <Space size={[0, 8]} wrap>
          {tags.map((option, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={option}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const tagElem = (
              <Tag
                key={option}
                closable={corrects[index] ? false : true}
                color={corrects[index] ? "success": "error"}
                icon={corrects[index] ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                style={{
                  userSelect: "none",
                }}
                onClose={() => handleClose(option)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(option);
                      e.preventDefault();
                    }
                  }}
                >
                  {option}
                </span>
              </Tag>
            );
            return tagElem;
          })}
        </Space>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={tagInputStyle}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag style={tagPlusStyle} onClick={showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Space>
    </Card>
  );
}

export default QuestionCard;
