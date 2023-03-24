import { Button, Row, Col, Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function TextProcessInput() {
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
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <Row gutter={[32, 32]} style={{paddingBottom:"5%"}}>
      <Col xs={24} sm={24} md={24} lg={20} xl={21}>
        <TextArea
          showCount
          maxLength={10000}
          style={{ height: 100 }}
          placeholder="Escriba su texto..."
          name="TextToProcess"
        />
      </Col>
      <Col xs={24} sm={24} md={8} lg={4} xl={3}>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Procesar texto
        </Button>
      </Col>
    </Row>
  );
}

export default TextProcessInput;
