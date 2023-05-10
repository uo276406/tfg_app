import { useState, useEffect, useRef } from "react";
import {
  Card,
  Typography,
  Tag,
  Input,
  Space,
  message,
  Button,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Paragraph } = Typography;

const questionCardStyle = {
  paddingTop: "1%",
  margin: "1%",
  backgroundColor: "#e6f7ff",
};

const questionTextStyle = {
  fontSize: "15px",
  whiteSpace: "pre-line",
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

const tagNumberStyle = {fontSize: "1.3em"};

const warningStyle = { color: "orange", fontSize: "1.5em" };

const buttonsDeleteDuplicateStyle = { width: "100px", marginLeft: "10px" };

/**
 * A component that displays a question card with editable question text and options for options.
 * @param {{questionText: string, options: Array<{value: string, correct: boolean}>}} props - The props object containing the question text and options.
 * @returns A JSX element that displays the question card.
 */
function QuestionCard(props) {
  const { t } = useTranslation();

  // Enucnciado ------------------------------------------------------------------
  const [questionText, setQuestionText] = useState(props.questionText);

  const handleModifyQuestionText = (newText) => {
    if (newText.length === 0) {
      message.error(t("questionEmpty"));
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
      message.error(t("optionEmpty"));
    } else {
      setEditInputValue(e.target.value);
    }
  };

  const handleEditInputConfirm = () => {
    const newOptions = [...options];
    newOptions[editInputIndex].value = editInputValue;
    setOptions(newOptions);
    setEditInputIndex(-1);
    setInputValue("");
    props.updateQuestion(props.index, questionText, newOptions); //Actualiza la pregunta
  };

  const [buttonVisible, setButtonVisible] = useState(false);

  // Botón de borrar pregunta ----------------------------------------------------
  const handleDelete = () => {
    props.deleteQuestion(props.index);
    message.success(t("questionDeleted"));
  };

  // Botón de duplicar pregunta --------------------------------------------------
  const handleDuplicate = () => {
    let questionDuplicated = {
      id: props.id,
      question: questionText,
      options: options,
    };

    props.addNewQuestion(questionDuplicated, props.index);
  };

  return (
    <>
      <Card
        size="small"
        extra={
          <div style={buttonsDeleteDuplicateStyle}>
            <Space direction="horizontal">
              {props.repeated ? (
                <Tooltip title={t("repeated")}>
                  <WarningFilled style={warningStyle}></WarningFilled>
                </Tooltip>
              ) : (
                <></>
              )}
              {buttonVisible ? (
                <>
                  <Tooltip title={t("duplicateQuestion")}>
                    <Button
                      type="text"
                      icon={<CopyOutlined></CopyOutlined>}
                      onClick={handleDuplicate}
                    />
                  </Tooltip>
                  <Tooltip title={t("deleteSelected")}>
                    <Button
                      type="text"
                      icon={<DeleteOutlined></DeleteOutlined>}
                      onClick={handleDelete}
                    />
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
            </Space>
          </div>
        }
        onMouseEnter={() => setButtonVisible(true)}
        onMouseLeave={() => setButtonVisible(false)}
        title={
          <Space direction={"horizontal"} align={"start"}>
            <Tag style={tagNumberStyle}>{props.index + 1}</Tag>
            <Paragraph
              editable={{
                onChange: handleModifyQuestionText,
              }}
              style={questionTextStyle}
            >
              {questionText}
            </Paragraph>
          </Space>
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
                    key={index}
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
                      setEditInputIndex(index);
                      setEditInputValue(option.value);
                      e.preventDefault();
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
