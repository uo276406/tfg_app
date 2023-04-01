import React, { useState } from "react";
import { Row } from "antd";
import KeywordCard from "./KeywordCard";

function KeywordCardList(props) {

  // Contador de número de seleccionadas
  let [countSelected, setCountSelected] = useState(0);
  function updateCountSelectedKeyword(keywordSelected) {
    if (keywordSelected.selected) 
      setCountSelected(++countSelected);
    else 
      setCountSelected(--countSelected)
    props.enableDelete(countSelected);
  }


  return (
    <Row
      justify={"center"}
      style={{ padding: "2%", borderRadius: "15px", backgroundColor: "white" }}
    >
      {props.keywordsFound.map((keyword) => {
        return (
          <KeywordCard
            updateCountSelectedKeywords={updateCountSelectedKeyword}
            key={keyword.index}
            value={keyword.value}
            index={keyword.index}
            enableAll={props.enableAll}
          />
        );
      })}
    </Row>
  );
}
export default KeywordCardList;
