import { useState } from "react";
import {
  Button,
  Row,
  Col,
  Input,
  Checkbox,
  message,
  Tooltip,
  Space,
  InputNumber,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import KeywordCard from "./KeywordCard";
import { useTranslation } from "react-i18next";

const listStyle = {
  padding: "1%",
  backgroundColor: "white",
  overflow: "scroll",
  maxHeight: 275,
};

const spaceStyle = { justifyContent: "center" };

const addButtonStyle = { paddingTop: "1%", paddingBottom: "1%" };

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
  const sameKeywordIndex = (i1, i2) => {
    return i1 === i2;
  };

  const isRepeated = (keyword) => {
    for (const k of keywordsList) {
      if (k.value.toLowerCase() === keyword.toLowerCase()) {
        return true;
      }
    }
    return false;
  };

  const isInText = (keyword) => {
    return RegExp("\\b" + keyword.toLowerCase() + "\\b").test(
      props.text.toLowerCase()
    );
  };

  const validateKeyword = (keyword) => {
    if (isRepeated(keyword)) {
      showMessages("repeatMessage", "error");
      return false;
    }

    if (!isInText(keyword)) {
      showMessages("inTextMessage", "error");
      return false;
    }
    return true;
  };

  // Lista de palabras clave totales ---------------------------------------------------
  let [keywordsList, setKeywordsList] = useState([...props.keywordsFound]);

  // Lista de palabras clave seleccionadas ---------------------------------------------
  let selectedKeywords = keywordsList.filter((k) => k.selected);
  let [countSelected, setCountSelected] = useState(
    props.keywordsFound.filter((k) => k.selected).length
  );

  const updateSelectedKeywords = (keyword) => {
    for (let elem of keywordsList) {
      if (sameKeywordIndex(elem.index, keyword.index)) {
        elem.selected = keyword.selected;
        elem.value = keyword.value;
        elem.numberOfQuestions = keyword.numberOfQuestions;
      }
    }
    props.handleKeywordsSelected(keywordsList);
    updateCheckAllButton();
    handleActivateButtons(selectedKeywords.length);
    setCountQuestionsToGenerate(countQuestions());
  };

  // Botón de eliminar ---------------------------------------------------------
  let [enabledDeleteButton, setEnabledDeleteButton] = useState(true);

  const deleteKeywordsSelected = () => {
    setKeywordsList((prevKeywordsList) => {
      for (let i = 0; i < prevKeywordsList.length; i++) {
        if (prevKeywordsList[i].selected) {
          prevKeywordsList.splice(i, 1);
          i--;
        }
      }
      return prevKeywordsList;
    });
    showMessages("deleteMessage", "success");
    updateCheckAllButton();
    handleActivateButtons(0);
    selectedKeywords = [];
    setCountQuestionsToGenerate(0);
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
  };

  // Botón de seleccionar todas ------------------------------------------------
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const activateAll = (value) => {
    setKeywordsList((prevKeywordsList) => {
      for (const k of prevKeywordsList) {
        let newNumberOfQuestions = k.numberOfQuestions;
        if (!value) {
          newNumberOfQuestions = 0;
        } else {
          if (k.numberOfQuestions === 0) {
            newNumberOfQuestions = 1;
          }
        }
        k.numberOfQuestions = newNumberOfQuestions;
        k.selected = value;
      }
      return prevKeywordsList;
    });
    setCheckAll(value);
    setIndeterminate(false);
    value
      ? handleActivateButtons(keywordsList.length)
      : handleActivateButtons(0);
    props.handleKeywordsSelected(keywordsList);
    setCountQuestionsToGenerate(countQuestions());
  };

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
  };

  // Buscador ------------------------------------------------------------------
  const searchedElements = keywordsList;
  const [searchTerm, setSearchTerm] = useState("");

  const editSearchField = (event) => {
    setSearchTerm(event.target.value);
  };

  const getSearchedTerms = () => {
    return searchedElements.filter((keyword) =>
      keyword.value.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  };

  // Botón de añadir -----------------------------------------------------------
  const [enabledAddButton, setEnabledAddButton] = useState(false);
  const [keywordToAdd, setKeywordToAdd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const activateButtonAdd = (event) => {
    setKeywordToAdd(event.target.value);
    event.target.value !== ""
      ? setEnabledAddButton(true)
      : setEnabledAddButton(false);
  };
  const addNewKeyword = () => {
    setKeywordsList((prevKeywordsList) => {
      let toAdd = {
        index: Math.max(...prevKeywordsList.map((k) => k.index)) + 1,
        value: keywordToAdd,
        selected: true,
        numberOfQuestions: 1,
      };

      if (validateKeyword(toAdd.value)) {
        prevKeywordsList.push(toAdd);
        setCountSelected(countSelected + 1);
        showMessages("addMessage", "success");
      }
      return prevKeywordsList;
    });
    setKeywordToAdd("");
    setEnabledAddButton(false);
    updateCheckAllButton();
    setCountQuestionsToGenerate(countQuestions());
  };

  // Contador de preguntas -----------------------------------------------------
  const countQuestions = () =>
    keywordsList.map((k) => k.numberOfQuestions).reduce((a, b) => a + b, 0);
  const [countQuestionsToGenerate, setCountQuestionsToGenerate] = useState(
    countQuestions()
  );

  const questionCounterStyle = {
    marginLeft: "auto",
    marginRight: "1%",
    width: "250px",
  };

  const showMessages = (text, type) => {
    messageApi.open({
      type: type,
      content: t(text),
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
            <Space style={spaceStyle} size={"large"} wrap>
              {getSearchedTerms().length > 0 ? (
                getSearchedTerms().map((keyword) => {
                  return (
                    <KeywordCard
                      updateSelectedKeywords={updateSelectedKeywords}
                      key={keyword.index}
                      index={keyword.index}
                      value={keyword.value}
                      selected={keyword.selected}
                      numberOfQuestions={keyword.numberOfQuestions}
                      isInText={isInText}
                      isRepeated={isRepeated}
                      showMessages={showMessages}
                    />
                  );
                })
              ) : (
                <h2>No se han encontrado palabras</h2>
              )}
            </Space>
          </Row>
        </Col>
      </Row>
      <Row gutter={[8, 8]} style={addButtonStyle}>
        <Col xs={16} sm={16} md={8} lg={8} xl={6} xxl={6}>
          <Input
            onChange={(event) => activateButtonAdd(event)}
            value={keywordToAdd}
            onPressEnter={addNewKeyword}
            placeholder={t("newWordPlaceHolder")}
          ></Input>
        </Col>
        {contextHolder}
        <Col xs={1} sm={1} md={1} lg={1} xl={1} xxl={1}>
          <Tooltip title={t("newWordTooltip")}>
            <Button
              type="primary"
              disabled={!enabledAddButton}
              onClick={addNewKeyword}
              icon={<PlusOutlined />}
            ></Button>
          </Tooltip>
        </Col>
        <Col
          style={questionCounterStyle}
          xs={24}
          sm={24}
          md={24}
          lg={7}
          xl={5}
          xxl={5}
        >
          <InputNumber
            min={0}
            defaultValue={countQuestionsToGenerate}
            value={countQuestionsToGenerate}
            addonAfter="preguntas se generarán"
          />
        </Col>
      </Row>
    </div>
  );
}
export default KeywordCardList;
