import React, { useState } from "react";
import { Card, Input, Badge, InputNumber, Button, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

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
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: true,
      numberOfQuestions: value,
    };
    props.updateSelectedKeywords(keywordSelected);
    setNumberOfQuestions(value);
  };

  const increase = (event) => {
    event.stopPropagation();
    setNumberOfQuestions(numberOfQuestions + 1);
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: true,
      numberOfQuestions: numberOfQuestions + 1,
    };
    props.updateSelectedKeywords(keywordSelected);
  };

  const decrease = (event) => {
    event.stopPropagation();
    setNumberOfQuestions(numberOfQuestions !== 0 ? numberOfQuestions - 1 : 0);
    const keywordSelected = {
      index: props.index,
      value: keyword,
      selected: numberOfQuestions - 1 === 0 ? false : true,
      numberOfQuestions:
        numberOfQuestions - 1 !== 0 ? numberOfQuestions - 1 : 0,
    };
    props.updateSelectedKeywords(keywordSelected);
  };

  return (
    <Badge.Ribbon text={props.numberOfQuestions}>
      <Card
        style={props.selected ? cardStyleSelected : cardStyleNotSelected}
        onClick={() => {
          handleSelect();
        }}
        onMouseEnter={(event) => {
          setEditableNumQuestions(true);
        }}
        onMouseLeave={(event) => {
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
                style={inputNumberStyle}
                min={0}
                value={props.numberOfQuestions}
                onChange={(value) => updateNumberOfQuestions(value)}
                controls={false}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 39) {
                    increase(event);
                  } else if (event.keyCode === 40) {
                    decrease(event);
                  }
                }}
              />
              <Button.Group>
                <Button
                  onClick={(event) => decrease(event)}
                  icon={<MinusOutlined />}
                />
                <Button
                  onClick={(event) => increase(event)}
                  icon={<PlusOutlined />}
                />
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
