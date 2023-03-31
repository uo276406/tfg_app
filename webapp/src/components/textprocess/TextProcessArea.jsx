import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function TextProcessArea(props) {
  const [loadings, setLoadings] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setText(props.textValue)
  }, [props.textValue])

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;

        //Envía le text
        props.onSendText(text);

        // Pasa a la nueva vista
        props.changeStep(1);

        return newLoadings;
      });
    }, 2000);
  };

    return (
    <div>
      <Row justify={"end"} gutter={[16, 16]} style={{ paddingBottom: "4%" }}>
        <Col span={24}>
          <TextArea
            showCount
            maxLength={10000}
            style={{
              height: 200,
              resize: "none",
              marginBottom: "1%",
            }}
            placeholder="Escriba su texto..."
            name="TextToProcess"
            value={text}
            onChange={(event) => {setText(event.target.value)}}
          />
        </Col>
        <Col span={24}>
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
                Procesar texto
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TextProcessArea;
