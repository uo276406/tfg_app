import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Upload, message } from "antd";
import { RightOutlined, UploadOutlined } from "@ant-design/icons";
import KeywordsConnector from "../../api/keywordsconnector";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const maxChars = 70000;

const textAreaStyle = {
  height: 200,
  resize: "none",
  padding: "1%",
  margin: "1%",
};
const buttonsStyle = {
  paddingRight: "2%",
  paddingLeft: "2%",
  marginBottom: "1%",
}

function TextProcessForm(props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  // Botón upload --------------------------------------------------
  const uploadProps = {
    name: "file",
    headers: {
      authorization: "authorization-text",
    },
    maxCount: 1,
    accept: ".txt",
    listType: "text",
    beforeUpload: (file) => {
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
    },
  };

  useEffect(() => {
    setText(props.textValue);
  }, [props.textValue]);

  // Carga del botón ------------------------------------------------
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        //Se envía el texto y se recogen las palabras clave
        let connector = new KeywordsConnector(text);
        connector.getKeywords().then((keywordsFetched) => {
          newLoadings[index] = false;

          props.onPassStep(text, keywordsFetched.keywords);
          // Pasa a la nueva vista
          props.changeStep(1);
        });
        return newLoadings;
      });
    }, 100);
  };

  return (
    <div>
      <Row justify={"end"} gutter={[16, 16]} >
        <Col span={24} >
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
                loading={loadings[0]}
                disabled={!text}
                onClick={() => {
                  enterLoading(0);
                }}
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
