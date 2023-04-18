import React, { useState } from "react";
import { Card, Input } from "antd";

const { Meta } = Card;

const cardStyleNotSelected = {
  margin: "0.5%",
  textAlign: "center",
  height: "auto",
};
const cardStyleSelected = {
  margin: "0.5%",
  textAlign: "center",
  height: "auto",
  backgroundColor: "#e6f7ff",
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
    };
    props.updateSelectedKeywords(keywordSelected);
  };

  // Editar ---------------------------------------------------------
  const [editable, setEditable] = useState(false);
  const [keyword, setKeyword] = useState(props.value);
  let prevKeyword = props.value

  const handleDoubleClick = (event) => {
    event.target.focus();
    setEditable(true);
  };

  const handleEditConfirm = () => {
    if (!props.isInText(keyword)){
      props.showMessages("inTextMessage", "error");
      setKeyword(prevKeyword)
      setEditable(true);
    } 
    else if (props.isRepeated(keyword) && keyword !== prevKeyword) {
      props.showMessages("repeatMessage", "error");
      setKeyword(prevKeyword)
      setEditable(true);
    }
    else if(keyword.length === 0){
      props.showMessages("noEmptyEditForm", "error");
      setKeyword(prevKeyword)
      setEditable(true);
    }
    else{
      setEditable(false);
    }
    prevKeyword = keyword;

    
  };

  const handleEdit = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <Card
      style={props.selected ? cardStyleSelected : cardStyleNotSelected}
      onClick={() => {
        handleSelect();
      }}
    >
      {editable ? (
        <Meta
          onClick={(event) => {
            handleSelect();
            event.stopPropagation();
          }}
          title={
            <Input
              autoFocus
              onChange={(event) => handleEdit(event)}
              onBlur={() => handleEditConfirm()}
              onPressEnter={() => handleEditConfirm()}
              value={keyword}
            ></Input>
          }
        />
      ) : (
        <Meta
          onDoubleClick={(event) => {
            handleDoubleClick(event);
          }}
          title={keyword}
        />
      )}
    </Card>
  );
}

export default KeywordCard;
