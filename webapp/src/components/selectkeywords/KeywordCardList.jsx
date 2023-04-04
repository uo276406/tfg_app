import { useState } from "react";
import { Button, Row, Col, Input, Checkbox, message } from "antd";
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
    return k1.value.toLowerCase() === k2.value.toLowerCase();
  }

  // Lista de palabras clave totales ---------------------------------------------------
  let [keywordsList, setKeywordsList] = useState([...props.keywordsFound]);

  // Lista de palabras clave seleccionadas ---------------------------------------------
  let selectedKeywords = keywordsList.filter((k) => k.selected);
  let [countSelected, setCountSelected] = useState(0);

  function updateSelectedKeywords(keyword) {
    for (let elem of keywordsList) {
      if (isKeywordEqual(elem, keyword)) {
        elem.selected = keyword.selected;
      }
    }
    selectedKeywords = keywordsList.filter((k) => k.selected);
    updateActivateAllButton(selectedKeywords);
    handleActivateButtons(selectedKeywords.length);
  }

  // Botón de eliminar ---------------------------------------------------------
  let [enabledDeleteButton, setEnabledDeleteButton] = useState(false);

  function deleteKeywordsSelected() {
    setKeywordsList((prevKeywordsList) => {
      for (let i = 0; i < prevKeywordsList.length; i++) {
        if (prevKeywordsList[i].selected) {
          prevKeywordsList.splice(i, 1);
          i--;
        }
      }
      console.log(prevKeywordsList);
      return prevKeywordsList;
    });
    successDelete();
    handleActivateButtons(0);
    selectedKeywords = [];
  }

  const successDelete = () => {
    messageApi.open({
      type: "success",
      content: "Palabras eliminadas correctamente",
      duration: 5,
    });
  };

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
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  function activateAll(value) {
    setKeywordsList((prevKeywordsList) => {
      for (const k of prevKeywordsList) {
        k.selected = value;
      }
      return prevKeywordsList;
    });
    selectedKeywords = keywordsList.filter((k) => k.selected);
    updateActivateAllButton(selectedKeywords);
    value
      ? handleActivateButtons(keywordsList.length)
      : handleActivateButtons(0);
  }

  function updateActivateAllButton(selectedKeywords) {
    if (
      selectedKeywords.length > 0 &&
      selectedKeywords.length < keywordsList.length
    ) {
      setIndeterminate(true);
      setCheckAll(false);
    } else if (selectedKeywords.length === 0) {
      setIndeterminate(false);
      setCheckAll(false);
    } else if (selectedKeywords.length === keywordsList.length) {
      setIndeterminate(false);
      setCheckAll(true);
    }
  }

  // Buscador ------------------------------------------------------------------

  // Botón de añadir -----------------------------------------------------------
  const [enabledAddButton, setEnabledAddButton] = useState(false);
  const [keywordToAdd, setKeywordToAdd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  function activateButtonAdd(event) {
    setKeywordToAdd(event.target.value);
    event.target.value !== ""
      ? setEnabledAddButton(true)
      : setEnabledAddButton(false);
  }
  function addNewKeyword() {
    setKeywordsList((prevKeywordsList) => {
      let toAdd = {
        key: Math.max(...prevKeywordsList.map((k) => k.key)) + 1,
        value: keywordToAdd,
        selected: false,
      };
      for (const k of prevKeywordsList) {
        if (isKeywordEqual(toAdd, k)) {
          errorAdd();
          return prevKeywordsList;
        }
      }
      prevKeywordsList.push(toAdd);
      successAdd();
      return prevKeywordsList;
    });
    setKeywordToAdd("");
    setEnabledAddButton(false);
  }

  const successAdd = () => {
    messageApi.open({
      type: "success",
      content: "Palabra añadida correctamente",
      duration: 5,
    });
  };

  const errorAdd = () => {
    messageApi.open({
      type: "error",
      content: "Palabra repetida",
      duration: 5,
    });
  };

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
              onClick={deleteKeywordsSelected}
              danger
            >
              Eliminar
            </Button>
          </Row>
        </Col>
        <Col>
          <Checkbox
            checked={checkAll}
            indeterminate={indeterminate}
            onChange={(event) => activateAll(event.target.checked)}
          >
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
            {keywordsList.length > 0 ? (
              keywordsList.map((keyword) => {
                return (
                  <KeywordCard
                    updateSelectedKeywords={updateSelectedKeywords}
                    key={keyword.key}
                    value={keyword.value}
                    selected={keyword.selected}
                  />
                );
              })
            ) : (
              <h1>No se han encontrado palabras</h1>
            )}
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
        {contextHolder}
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
