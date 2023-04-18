import { useState } from "react";
import { Button, Row, Col, Input, Checkbox, message, Tooltip } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import KeywordCard from "./KeywordCard";
import { useTranslation } from "react-i18next";

const justifyAddButtons = {
  xs: "center",
  sm: "center",
  md: "start",
  lg: "start",
  xl: "start",
  xxxl: "start",
};

const listStyle = {
  padding: "1%",
  backgroundColor: "white",
  overflow: 'scroll',
  maxHeight: 275
  
};

const addButtonStyle = { paddingTop: "1%" };

/**
 * A component that displays a list of keywords and allows the user to select, delete, and add new keywords.
 * @param {{Object}} props - The props object.
 * @param {Array} props.keywordsFound - An array of objects representing the keywords found.
 * @param {Function} props.handleKeywordsSelected - A function that handles the selected keywords.
 * @param {Function} props.enableGenerateQuestionButton - A function that enables the generate question button.
 * @returns A component that displays a list of keywords and allows the user to select, delete, and add new keywords.
 */
function KeywordCardList(props) {
  const { t } = useTranslation();

  // Compara palabras clave ----------------------------------------------------
  function isKeywordEqual(k1, k2) {
    return k1.value.toLowerCase() === k2.value.toLowerCase();
  }

  // Lista de palabras clave totales ---------------------------------------------------
  const percentageOfSelected = 0.75
  let [keywordsList, setKeywordsList] = useState([
    ...props.keywordsFound.map((k, index) => {
      let toSelect = index < props.keywordsFound.length*percentageOfSelected ? true : false
      return { index: k.index, value: k.value, selected: toSelect};
    }),
  ]);

  // Lista de palabras clave seleccionadas ---------------------------------------------

  let selectedKeywords = keywordsList.filter((k) => k.selected);
  let [countSelected, setCountSelected] = useState(0);

  const updateSelectedKeywords = (keyword) => {
    for (let elem of keywordsList) {
      if (isKeywordEqual(elem, keyword)) {
        elem.selected = keyword.selected;
      }
    }
    props.handleKeywordsSelected(keywordsList.filter((k) => k.selected));
    console.log(keywordsList.filter((k) => k.selected))
    updateCheckAllButton();
    handleActivateButtons(selectedKeywords.length);
  }

  // Botón de eliminar ---------------------------------------------------------
  let [enabledDeleteButton, setEnabledDeleteButton] = useState(false);

  const deleteKeywordsSelected = () => {
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
    updateCheckAllButton();
    handleActivateButtons(0);
    selectedKeywords = [];
  }

  const successDelete = () => {
    messageApi.open({
      type: "success",
      content: t("deleteMessage"),
      duration: 5,
    });
  };

  // Activa botones ------------------------------------------------------------
  const handleActivateButtons = (count) => {
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

  const activateAll = (value) => {
    setKeywordsList((prevKeywordsList) => {
      for (const k of prevKeywordsList) {
        k.selected = value;
      }
      return prevKeywordsList;
    });
    console.log(keywordsList);
    updateCheckAllButton();
    value
      ? handleActivateButtons(keywordsList.length)
      : handleActivateButtons(0);
  }

  const updateCheckAllButton = () => {
    selectedKeywords = keywordsList.filter((k) => k.selected);
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
  const searchedElements = keywordsList;
  const [searchTerm, setSearchTerm] = useState("");

  const editSearchField = (event) => {
    setSearchTerm(event.target.value);
  }

  const getSearchedTerms = () => {
    return searchedElements.filter((keyword) =>
      keyword.value.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  }

  // Botón de añadir -----------------------------------------------------------
  const [enabledAddButton, setEnabledAddButton] = useState(false);
  const [keywordToAdd, setKeywordToAdd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const activateButtonAdd = (event) => {
    setKeywordToAdd(event.target.value);
    event.target.value !== ""
      ? setEnabledAddButton(true)
      : setEnabledAddButton(false);
  }
  const addNewKeyword = () => {
    setKeywordsList((prevKeywordsList) => {
      let toAdd = {
        index: Math.max(...prevKeywordsList.map((k) => k.index)) + 1,
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
      content: t("addMessage"),
      duration: 5,
    });
  };

  const errorAdd = () => {
    messageApi.open({
      type: "error",
      content: t("repeatMessage"),
      duration: 5,
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <Input
            value={searchTerm}
            onChange={(event) => editSearchField(event)}
            placeholder={t("searchPlaceholder")}
          />
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
              {t("deleteSelected")}
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
              ? t("selectAll")
              : countSelected + t("numberSelectAll")}
          </Checkbox>
        </Col>
        <Col span={24}>
          <Row justify={"center"} style={listStyle}>
            {getSearchedTerms().length > 0 ? (
              getSearchedTerms().map((keyword) => {
                return (
                  <KeywordCard
                    updateSelectedKeywords={updateSelectedKeywords}
                    key={keyword.index}
                    index={keyword.index}
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
      <Row justify={justifyAddButtons} gutter={[8, 8]} style={addButtonStyle}>
        <Col>
          <Input
            onChange={(event) => activateButtonAdd(event)}
            value={keywordToAdd}
            placeholder={t("newWordPlaceHolder")}
          ></Input>
        </Col>
        {contextHolder}
        <Col>
          <Tooltip title={t("newWordTooltip")}>
            <Button
              type="primary"
              disabled={!enabledAddButton}
              onClick={addNewKeyword}
              icon={<PlusOutlined />}
            ></Button>
          </Tooltip>
        </Col>
      </Row>
    </div>
  );
}
export default KeywordCardList;
