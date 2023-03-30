import React, { useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { TextArea } = Input;


function TextProcessArea(props) {
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
        newLoadings[index] = false;

        // Pasa a la nueva vista
        props.changeStep(1);

        return newLoadings;
      });
    }, 6000);
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
            }}
            placeholder="Escriba su texto..."
            name="TextToProcess"
          />
        </Col>
        <Col span={24}>
          <Row justify={"end"} gutter={[32, 32]}>
            <Col>
              <Button
                type="primary"
                icon={<RightOutlined />}
                loading={loadings[0]}
                onClick={() => enterLoading(0)}
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
