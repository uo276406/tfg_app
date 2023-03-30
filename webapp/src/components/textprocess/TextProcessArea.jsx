import React, { useState } from "react";
import { Button, Row, Col, Input } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const justifyProps = {
  lg: "end",
  md: "end",
  sm: "end",
  xs: "end",
};

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
        props.changeStep(1)

        return newLoadings;
      });
    }, 6000);
    
  };


  return (
    <div>
      <Row gutter={[32, 32]} style={{ paddingBottom: "5%" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={21} xxl={20}>
          <TextArea
            showCount
            maxLength={10000}
            style={{ height: 200 }}
            placeholder="Escriba su texto..."
            name="TextToProcess"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3}>
          <Row justify={justifyProps} >
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
