import { useState, useEffect, useRef } from "react";
import { Card, Typography, Tag, Input, Space, message, Button } from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";


const { Paragraph } = Typography;

const questionCardStyle = {
  width: "100%",
  paddingTop: "1%",
  margin: "1%",
  backgroundColor: "#e6f7ff",
};

const questionTextStyle = {
  fontSize: "15px",
  whiteSpace: "pre-line",
  marginRight: "5%",
};

const optionInputStyle = {
  width: 78,
  verticalAlign: "top",
};

const optionPlusStyle = {
  borderStyle: "dashed",
  fontSize: "15px",
};

const optionsAdded = {
  userSelect: "none",
  fontSize: "16px",
};

/**
 * A component that displays a question card with editable question text and options for options.
 * @param {{questionText: string, options: Array<{value: string, correct: boolean}>}} props - The props object containing the question text and options.
 * @returns A JSX element that displays the question card.
 */
function QuestionCard(props) {
  const { t } = useTranslation();
  const [messageApi, contextHolder] = message.useMessage();

  // Enucnciado ------------------------------------------------------------------
  const [questionText, setQuestionText] = useState(props.questionText);

  const handleModifyQuestionText = (newText) => {
    if (newText.length === 0) {
      emptyOption();
    } else {
      setQuestionText(newText);
      props.updateQuestion(props.index, newText, options); //Actualiza la pregunta
    }
  };

  // Opciones --------------------------------------------------------------------
  const [options, setOptions] = useState([...props.options]);

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

  const handleClose = (removedOption) => {
    const newOptions = options.filter((option) => option !== removedOption);
    setOptions(newOptions);
    props.updateQuestion(props.index, questionText, newOptions); //Actualiza la pregunta
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && options.indexOf(inputValue) === -1) {
      let newOptions = options;
      newOptions.push({ value: inputValue, correct: false });
      setOptions(newOptions);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    if (e.target.value.length === 0) {
      emptyOption();
    } else {
      setEditInputValue(e.target.value);
    }
  };

  const emptyOption = () => {
    messageApi.open({
      type: "error",
      content: t("optionEmpty"),
      duration: 5,
    });
  };

  const handleEditInputConfirm = () => {
    const newOptions = [...options];
    newOptions[editInputIndex] = editInputValue;
    setOptions(newOptions);
    setEditInputIndex(-1);
    setInputValue("");
    props.updateQuestion(props.index, questionText, newOptions); //Actualiza la pregunta
  };

  // Botón de borrar pregunta ----------------------------------------------------
  const [buttonVisible, setButtonVisible] = useState(false);

  const handleDelete = () => {
    props.deleteQuestion(props.index);
  };

  return (
    <>
      {contextHolder}
      <Card
        size="small"
        extra={
          buttonVisible ? (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined></DeleteOutlined>}
              onClick={handleDelete}
            />
          ) : null
        }
        onMouseEnter={() => setButtonVisible(true)}
        onMouseLeave={() => setButtonVisible(false)}
        title={
          <Paragraph
            editable={{
              onChange: handleModifyQuestionText,
            }}
            style={questionTextStyle}
          >
            {questionText}
          </Paragraph>
        }
        style={questionCardStyle}
      >
        <Space size={[0, 8]} wrap>
          <Space size={[0, 8]} wrap>
            {options.map((option, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={option.value}
                    size="small"
                    style={optionInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const optionElem = (
                <Tag
                  key={option.value}
                  closable={options[index].correct ? false : true}
                  color={options[index].correct ? "success" : "error"}
                  icon={
                    options[index].correct ? (
                      <CheckCircleOutlined />
                    ) : (
                      <CloseCircleOutlined />
                    )
                  }
                  style={optionsAdded}
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
                    {option.value}
                  </span>
                </Tag>
              );
              return optionElem;
            })}
          </Space>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={optionInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag style={optionPlusStyle} onClick={showInput}>
              <PlusOutlined /> {t("addOption")}
            </Tag>
          )}
        </Space>
      </Card>
    </>
  );
}

export default QuestionCard;
