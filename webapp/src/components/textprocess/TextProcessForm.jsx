import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Upload, message } from "antd";
import { RightOutlined, UploadOutlined } from "@ant-design/icons";
import KeywordsConnector from "../../api/keywordsconnector";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;
const maxChars = 60000;

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
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.readAsText(file);
      // Prevent upload
      return false;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
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
      <Row justify={"end"} gutter={[16, 16]} style={{ paddingBottom: "2%" }}>
        <Col span={24}>
          <TextArea
            showCount
            maxLength={maxChars}
            style={{
              height: 200,
              resize: "none",
              marginBottom: "1%",
            }}
            placeholder={t("textAreaPlaceHolder")}
            name="TextToProcess"
            value={text}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
        </Col>
        <Col span={6}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Col>
        <Col span={18}>
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
