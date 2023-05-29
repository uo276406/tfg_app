import React, { useState } from "react";
import { Card, Input, Badge, InputNumber, Button, Space, Tooltip } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const cardStyleNotSelected = {
  textAlign: "center",
  width: "250px",
  height: "125px",
};
const cardStyleSelected = {
  textAlign: "center",
  backgroundColor: "#e6f7ff",
  width: "250px",
  height: "125px",
};

const textStyle = {
  textAlign: "center",
  fontSize: "1.2em",
  fontWeight: "bold",
};

const inputStyle = {
  textAlign: "center",
  fontSize: "1em",
  fontWeight: "bold",
};

const inputNumberStyle = {
  width: "60px",
};

/**
 * A component that displays a keyword card with options to edit and select the keyword.
 * @param {{object}} props - The props object containing the keyword information and functions to update the selected keywords.
 * @returns A card component displaying the keyword and options to edit and select it.
 */
function KeywordCard(props) {
  const { t } = useTranslation();

  // Selección ------------------------------------------------------
  const handleSelect = () => {
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: !props.selected,
      numberOfQuestions: !props.selected ? 1 : 0,
    };
    props.updateSelectedKeywords(keywordSelected);
    setNumberOfQuestions(!props.selected ? 1 : 0);
  };

  // Editar ---------------------------------------------------------
  const [editable, setEditable] = useState(false);
  const [keyword, setKeyword] = useState(props.value);
  let prevKeyword = props.value;

  const handleDoubleClick = (event) => {
    event.target.focus();
    setEditable(true);
  };

  const handleEditConfirm = () => {
    if (!props.isInText(keyword)) {
      props.showMessages("inTextMessage", "error");
      setKeyword(prevKeyword);
      setEditable(true);
    } else if (props.isRepeated(keyword) && keyword !== prevKeyword) {
      props.showMessages("repeatMessage", "error");
      setKeyword(prevKeyword);
      setEditable(true);
    } else if (keyword.length === 0) {
      props.showMessages("noEmptyEditForm", "error");
      setKeyword(prevKeyword);
      setEditable(true);
    } else {
      setEditable(false);
    }
    prevKeyword = keyword;
  };

  const handleEdit = (e) => {
    setKeyword(e.target.value);
  };

  // Badge ----------------------------------------------------------
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    props.numberOfQuestions
  );
  const [editableNumQuestions, setEditableNumQuestions] = useState(false);

  const updateNumberOfQuestions = (value) => {
    let isSelected = true;
    if (value < 0 || typeof value === "string" || value === "" || value === null) {
      setNumberOfQuestions(0);
      value = 0;
      isSelected = false;
    } else {
      setNumberOfQuestions(value);
      
    }
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: isSelected,
      numberOfQuestions: value,
    };
    props.updateSelectedKeywords(keywordSelected);
  };

  const increase = (event) => {
    event.stopPropagation();
    let newValue = props.numberOfQuestions + 1;
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: true,
      numberOfQuestions: newValue,
    };
    setNumberOfQuestions(newValue);
    props.updateSelectedKeywords(keywordSelected);
  };

  const decrease = (event) => {
    event.stopPropagation();
    let newValue =
      props.numberOfQuestions !== 0 ? props.numberOfQuestions - 1 : 0;
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: props.numberOfQuestions - 1 === 0 ? false : true,
      numberOfQuestions: newValue,
    };
    setNumberOfQuestions(newValue);
    props.updateSelectedKeywords(keywordSelected);
  };

  return (
    <Badge.Ribbon
      text={
        <Tooltip title={t("questionsByWord") + keyword}>
          {props.numberOfQuestions}
        </Tooltip>
      }
    >
      <Card
        id={"keyword" + props.index}
        style={props.selected ? cardStyleSelected : cardStyleNotSelected}
        onClick={() => {
          handleSelect();
        }}
        onMouseEnter={() => {
          setEditableNumQuestions(true);
        }}
        onMouseLeave={() => {
          setEditableNumQuestions(false);
        }}
      >
        <>
          {editable ? (
            <p
              onClick={(event) => {
                handleSelect();
                event.stopPropagation();
              }}
              style={textStyle}
            >
              <Input
                autoFocus
                onChange={(event) => handleEdit(event)}
                onBlur={() => handleEditConfirm()}
                onPressEnter={() => handleEditConfirm()}
                value={keyword}
                style={inputStyle}
                size="small"
              ></Input>
            </p>
          ) : (
            <p
              onDoubleClick={(event) => {
                handleDoubleClick(event);
              }}
              style={textStyle}
            >
              {keyword}
            </p>
          )}
        </>

        <>
          {editableNumQuestions ? (
            <Space>
              <InputNumber
                id={"inputNumber" + props.index}
                style={inputNumberStyle}
                min={0}
                value={props.numberOfQuestions}
                onChange={(value) => updateNumberOfQuestions(value)}
                controls={false}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  if (
                    (event.keyCode >= 48 && event.keyCode <= 57) || // Números del teclado numérico
                    (event.keyCode >= 96 && event.keyCode <= 105) || // Números del teclado normal
                    event.keyCode === 8 // Backspace
                  ) {
                    if (event.keyCode === 39) {
                      increase(event);
                    } else if (event.keyCode === 40) {
                      decrease(event);
                    } else if (event.keyCode === 37) {
                      decrease(event);
                    } else if (event.keyCode === 38) {
                      increase(event);
                    } else if (props.numberOfQuestions === 0) {
                      updateNumberOfQuestions(0);
                    }
                  } else {
                    event.preventDefault();
                  }
                }}
              />
              <Button.Group>
                <Tooltip title={t("decreaseQuestionToGenerate")}>
                  <Button
                    id={"decreaseButton" + props.index}
                    disabled={numberOfQuestions === 0}
                    onClick={(event) => decrease(event)}
                    icon={<MinusOutlined />}
                  />
                </Tooltip>
                <Tooltip title={t("increaseQuestionToGenerate")}>
                  <Button
                    id={"increaseButton" + props.index}
                    onClick={(event) => increase(event)}
                    icon={<PlusOutlined />}
                  />
                </Tooltip>
              </Button.Group>
            </Space>
          ) : (
            <></>
          )}
        </>
      </Card>
    </Badge.Ribbon>
  );
}

export default KeywordCard;
