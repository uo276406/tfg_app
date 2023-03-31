import { useState } from "react";
import { Button, Row, Col } from "antd";
import { RightOutlined, LeftOutlined, DeleteOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";

function SelectKeywordsForm(props) {
  // Botón de siguiente
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
      <Row gutter={[16, 16]} style={{ paddingBottom: "4%" }}>
        <Col span={24}>
          <Row justify={"end"}>
            <Button type="primary" icon={<DeleteOutlined />} disabled={true} danger>
              Eliminar
            </Button>
          </Row>
        </Col>
        <Col span={24}>
          <KeywordCardList />
        </Col>
        <Col span={24}>
          <Row justify={"end"} gutter={[32, 32]}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  props.changeStep(0)}}
                icon={<LeftOutlined />}
              >
                Volver
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<RightOutlined />}
                loading={loadings[0]}
                disabled={true}
                onClick={() => enterLoading(0)}
              >
                Generar preguntas
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default SelectKeywordsForm;
