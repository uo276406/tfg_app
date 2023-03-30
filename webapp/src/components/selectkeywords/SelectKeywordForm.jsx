import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import KeywordCard from "./KeywordCard";

const justifyProps = {
  xxl: "end",
  xl: "end",
  lg: "end",
  md: "end",
  sm: "end",
  xs: "end",
};

function SelectKeywordsForm() {

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
    <div>
      <Row gutter={[32, 32]} style={{ paddingBottom: "5%" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={21} xxl={20} style={{ padding:"2%", border: "2px solid blue", borderRadius: "5px"}}>
          <KeywordCard/>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={3} xxl={3}>
          <Row justify={justifyProps} >
            <Col>
            <Button
              type="primary"
              loading={loadings[0]}
              onClick={() => enterLoading(0)}
            >
              Crear Preguntas
            </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectKeywordsForm;
