import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Upload, message } from "antd";
import { RightOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import KeywordsConnector from "../../api/keywordsconnector";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const exampleText =
  "America, Europe, and Africa Before 1492\nGlobalization, the ever-increasing interconnectedness of the world, is not a new phenomenon, but it accelerated when western Europeans discovered the riches of the East. During the Crusades (1095–1291), Europeans developed an appetite for spices, silk, porcelain, sugar, and other luxury items from the East, for which they traded fur, timber, and Slavic people they captured and sold (hence the word slave). But when the Silk Road, the long overland trading route from China to the Mediterranean, became costlier and more dangerous to travel, Europeans searched for a more efficient and inexpensive trade route over water, initiating the development of what we now call the Atlantic World. \n In pursuit of commerce in Asia, fifteenth-century traders unexpectedly encountered a “New World” populated by millions and home to sophisticated and numerous peoples. Mistakenly believing they had reached the East Indies, these early explorers called its inhabitants “Indians.” West Africa, a diverse and culturally rich area, soon entered the stage as other nations exploited its slave trade and brought its peoples to the New World in chains. Although Europeans would come to dominate the New World, they could not have done so without Africans and Native peoples .";

const textAreaStyle = {
  height: 250,
  resize: "none",
  paddingLeft: "1%",
  paddingRight: "1%",
  paddingBottom: "0.5%",
  marginLeft: "1%",
  marginRight: "1%",
  marginBottom: "0.5%",
};
const buttonsStyle = {
  paddingRight: "2.5%",
  paddingLeft: "2.5%",
  marginBottom: "1%",
};
const buttons2Style = {
  marginLeft: "3%",
}


/**
"""
A component that displays a form for processing text. The form includes a text area for inputting text, a button for uploading a text file, and a button for processing the text and finding keywords.
 */
function TextProcessForm(props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  // Botón upload --------------------------------------------------
  const loadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setText(e.target.result);
    };
    reader.readAsText(file);
    message.success(`${file.name}` + t("sucessfulUpload"));
    return false;
  };

  const uploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    maxCount: 1,
    accept: ".txt",
    listType: "text",
    beforeUpload: loadFile,
  };

  useEffect(() => {
    setText(props.textValue);
  }, [props.textValue]);

  // Botón envío de texto ------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const sendApiMessage = async () => {
    setIsLoading(true);
    let connector = new KeywordsConnector();
    await connector.getKeywords(text).then((keywordsFetched) => {
      props.handleKeywordsFound(text, keywordsFetched.keywords);
      setIsLoading(false);
      props.changeStep(1);
    });
  };

  return (
    <div>
      <Row justify={"end"} gutter={[16, 16]}>
        <Col span={24}>
          <TextArea
            showCount
            style={textAreaStyle}
            placeholder={t("textAreaPlaceHolder")}
            name="TextToProcess"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </Col>
        <Col span={12} style={buttonsStyle}>
          <Row >
            <Upload  {...uploadProps}>
              <Button icon={<UploadOutlined />}>{t("uploadButton")}</Button> 
            </Upload>
            <Button type="primary" style={buttons2Style} onClick={() => setText(exampleText)}>
              {t("testText")}
            </Button>
            <Button
              style={buttons2Style}
              type="primary"
              disabled={text.length === 0}
              icon={<DeleteOutlined />}
              onClick={() => setText("")}
              danger
            >
              {t("deleteSelected")}
            </Button>
          </Row>
        </Col>
        <Col span={12} style={buttonsStyle}>
          <Row justify={"end"} gutter={[32, 32]}>
            <Col>
              <Button
                type="primary"
                icon={<RightOutlined />}
                loading={isLoading}
                disabled={!text}
                onClick={sendApiMessage}
              >
                {t("processTextButton")}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TextProcessForm;
