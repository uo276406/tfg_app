import { useState } from "react";
import { Button, Row, Col, Input, Checkbox } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import KeywordCard from "./KeywordCard";

const justifyAddButtons = {
  xs: "center",
  sm: "center",
  md: "start",
  lg: "start",
  xl: "start",
  xxxl: "start",
};

function KeywordCardList(props) {
  // Compara palabras clave ----------------------------------------------------
  function isKeywordEqual(k1, k2) {
    return k1.key === k2.key && k1.value === k2.value;
  }

  // Quita palabras de la lista de seleccionadas --------------------------------------
  function deselectKeywordSelected(k) {
    for (let i = 0; i < keywordsSelectedList.length; i++) {
      if (isKeywordEqual(k, keywordsSelectedList[i])) {
        keywordsSelectedList.splice(i, 1);
      }
    }
  }

  // Lista de palabras clave totales ---------------------------------------------------
  let [keywordsList, setKeywordsList] = useState([...props.keywordsFound]);

  // Lista de palabras clave seleccionadas ---------------------------------------------
  let [keywordsSelectedList, setKeywordsSelectedList] = useState([]);
  let [countSelected, setCountSelected] = useState(0);

  function updateSelectedKeywords(keywordSelected) {
    if (keywordSelected.selected) {
      setCountSelected(++countSelected);
      keywordsSelectedList.push(keywordSelected);
    } else {
      setCountSelected(--countSelected);
      deselectKeywordSelected(keywordSelected);
    }
    console.log(keywordsSelectedList);
    handleActivateButtons(countSelected);
  }

  // Botón de eliminar ---------------------------------------------------------
  let [enabledDeleteButton, setEnabledDeleteButton] = useState(false);

  // Activa botones ------------------------------------------------------------
  function handleActivateButtons(count) {
    setCountSelected(count);
    if (count > 0) {
      setEnabledDeleteButton(true);
      props.enableGenerateQuestionButton(true);
    } else {
      setEnabledDeleteButton(false);
      props.enableGenerateQuestionButton(false);
    }
  }

  // Botón de seleccionar todas ------------------------------------------------

  // Buscador ------------------------------------------------------------------

  // Botón de añadir -----------------------------------------------------------
  const [enabledAddButton, setEnabledAddButton] = useState(false);
  const [keywordToAdd, setKeywordToAdd] = useState("");

  function activateButtonAdd(event) {
    setKeywordToAdd(event.target.value);
    event.target.value !== ""
      ? setEnabledAddButton(true)
      : setEnabledAddButton(false);
  }

  function addNewKeyword() {
    console.log(keywordsList);

    setKeywordsList((prevKeywordsList) => {
      let newKeywordList = [...prevKeywordsList];
      let toAdd = {
        index: keywordsList.length,
        value: keywordToAdd,
      };
      newKeywordList.push(toAdd);
      return newKeywordList;
    });
  }

  return (
    <div>
      <Row gutter={[16, 16]} style={{ paddingBottom: "2%" }}>
        <Col span={10}>
          <Input placeholder="Buscar..." />
        </Col>
        <Col span={14}>
          <Row justify={"end"}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              disabled={!enabledDeleteButton}
              danger
            >
              Eliminar
            </Button>
          </Row>
        </Col>
        <Col>
          <Checkbox>
            {countSelected === 0
              ? "Seleccionar todas"
              : countSelected + " palabras seleccionadas"}
          </Checkbox>
        </Col>
        <Col span={24}>
          <Row
            justify={"center"}
            style={{
              padding: "2%",
              borderRadius: "15px",
              backgroundColor: "white",
            }}
          >
            {keywordsList.map((keyword) => {
              return (
                <KeywordCard
                  updateSelectedKeywords={updateSelectedKeywords}
                  key={keyword.index}
                  value={keyword.value}
                  index={keyword.index}
                />
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row
        justify={justifyAddButtons}
        gutter={[8, 8]}
        style={{ paddingBottom: "2%" }}
      >
        <Col>
          <Input
            onChange={(event) => activateButtonAdd(event)}
            value={keywordToAdd}
            placeholder="Nueva palabra..."
          ></Input>
        </Col>
        <Col>
          <Button
            type="primary"
            disabled={!enabledAddButton}
            onClick={addNewKeyword}
            icon={<PlusOutlined />}
          ></Button>
        </Col>
      </Row>
    </div>
  );
}
export default KeywordCardList;
