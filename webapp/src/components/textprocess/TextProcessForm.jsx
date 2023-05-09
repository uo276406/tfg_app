import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Input,
  Upload,
  message,
  Spin,
  notification,
} from "antd";
import {
  RightOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import KeywordsConnector from "../../api/keywordsconnector";
import { useTranslation } from "react-i18next";
import TxtImporter from "./import/txtimporter";

const { TextArea } = Input;

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
};

const exampleText =
  "The Americas, Europe, and Africa Before 1492	\nINTRODUCTION \nGlobalization, the ever-increasing interconnectedness, is not a new phenomenon, but it accelerated when western Europeans discovered the riches of the East. During the Crusades (1095–1291), Europeans developed an appetite for spices, silk, porcelain, sugar, and other luxury items from the East, for which they traded fur, timber, and Slavics they captured and sold (hence the word slave). But when the Silk Road, the long overland trading route from China to the Mediterranean, became costlier and more dangerous to travel, Europeans searched for a more efficient and inexpensive trade route over water, initiating the development of what we now call the Atlantic World. In pursuit of commerce in Asia, fifteenth-century traders unexpectedly encountered a “New World” populated by millions. Mistakenly believing they had reached the East Indies, these early explorers called its inhabitants “Indians.” West Africa, a diverse and culturally rich area, soon entered the stage as other nations exploited its slave trade and brought its them to the new continent in chains. Although Europeans would come to dominate the new continent, they could not have done so without Africans and Natives. \nThe Americas\nMost Native American origin stories assert that Native nations have always called the Americas home; however, some scholars believe that between nine and fifteen thousand years ago, a land bridge existed between Asia and North America that we now call  Beringia . The first inhabitants of what would be named the Americas migrated across this bridge in search of food. When the glaciers melted, water engulfed Beringia, and the Bering Strait was formed. Later settlers came by boat across the narrow strait. (The fact that Asians and Native Americans share genetic markers on a Y chromosome lends credibility to this migration theory.) Continually moving southward, the settlers eventually populated both North and South America, creating unique cultures that ranged from the highly complex and urban Aztec civilization in what is now Mexico City to the woodland tribes of eastern North America. Recent research along the west coast of South America suggests that migrant populations may have traveled down this coast by water as well as by land. Researchers believe that about ten thousand years ago, humans also began the domestication of plants and animals, adding agriculture as a means of sustenance to hunting and gathering techniques. With this agricultural revolution, and the more abundant and reliable food supplies it brought, populations grew and they were able to develop a more settled way of life, building permanent settlements. Nowhere in the Americas was this more obvious than in Mesoamerica .";

/**
"""
A component that displays a form for processing text. The form includes a text area for inputting text, a button for uploading a text file, and a button for processing the text and finding keywords.
 */
function TextProcessForm(props) {
  const { t } = useTranslation();
  const [text, setText] = useState("");

  // Botón upload --------------------------------------------------
  const loadFile = (file) => {
    let importer = null;
    if (file.type === "text/plain") {
      importer = new TxtImporter();
    }
    importer.import(file, (text) => {
      setText(text);
      message.success(`${file.name}` + t("sucessfulUpload"));
    });
    return false;
  };

  const uploadProps = {
    name: "file",
    maxCount: 1,
    accept: [".txt", ".docx", ".pptx"],
    beforeUpload: loadFile,
    onRemove: () => {
      setText("");
    },
  };

  useEffect(() => {
    setText(props.textValue);
  }, [props.textValue]);

  // Botón envío de texto ------------------------------------------------
  const [isLoading, setIsLoading] = useState(false);
  const sendApiMessage = async () => {
    setIsLoading(true);
    let connector = new KeywordsConnector();
    await connector
      .getKeywords(text, props.accessToken)
      .then((keywordsFetched) => {
        if (keywordsFetched.detail !== "Unauthorized") {
          props.handleKeywordsFound(text, keywordsFetched.keywords);
          setIsLoading(false);
          props.changeStep(1);
        } else if (keywordsFetched.detail === "Unauthorized") {
          openNotificationWithIcon("info");
        }
      })
      .catch((error) => {
        openNotificationWithIcon("info");
      });
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: t("sessionExpired"),
      description: t("sessionExpiredDescription"),
    });
  };

  const [api, contextHolder] = notification.useNotification();

  return (
    <div>
      {contextHolder}
      <Spin spinning={isLoading ? true : false}>
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
            <Row>
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>{t("uploadButton")}</Button>
              </Upload>
              <Button
                type="primary"
                style={buttons2Style}
                onClick={() => setText(exampleText)}
              >
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
                  disabled={!text}
                  onClick={sendApiMessage}
                >
                  {t("processTextButton")}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default TextProcessForm;
