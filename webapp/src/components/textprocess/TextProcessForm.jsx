import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Upload, message } from "antd";
import { RightOutlined, UploadOutlined } from "@ant-design/icons";
import KeywordsConnector from "../../api/keywordsconnector";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const maxChars = 70000;

const textAreaStyle = {
  height: 275,
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

/**
"""
A component that displays a form for processing text. The form includes a text area for inputting text, a button for uploading a text file, and a button for processing the text and finding keywords.
 */
function TextProcessForm(props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  // Botón upload --------------------------------------------------
  const loadFile = (file) => {
    if (file.size > maxChars) {
      message.error(`${file.name}` + t("tooBig"));
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
      message.success(`${file.name}` + t("sucessfulUpload"));
    }
    return false;
  }

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
    let connector = new KeywordsConnector(text);
    await connector.getKeywords().then((keywordsFetched) => {
      props.handleKeywordsFound(text, keywordsFetched.keywords);
      setIsLoading(false);
      props.changeStep(1);
    });
  }

  return (
    <div>
      <Row justify={"end"} gutter={[16, 16]}>
        <Col span={24}>
          <TextArea
            showCount
            maxLength={maxChars}
            style={textAreaStyle}
            placeholder={t("textAreaPlaceHolder")}
            name="TextToProcess"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </Col>
        <Col span={6} style={buttonsStyle}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>{t("uploadButton")}</Button>
          </Upload>
        </Col>
        <Col span={18} style={buttonsStyle}>
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
