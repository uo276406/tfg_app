import { useState } from "react";
import { Button, Row, Col, Input, Checkbox } from "antd";
import { RightOutlined, LeftOutlined, DeleteOutlined } from "@ant-design/icons";
import KeywordCardList from "./KeywordCardList";

function SelectKeywordsForm(props) {
  // Botón de generar preguntas -----------------------------------------------
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

  // Botón de eliminar ---------------------------------------------------------
  const [enabledDeleteButton, setEnabledDeleteButton] = useState(false);
  const [countSelected, setCountSelected] = useState(0);
  function handleEnabledDeleteButton(count) {
    setCountSelected(count);
    count > 0 ? setEnabledDeleteButton(true) : setEnabledDeleteButton(false);
  }

  // Botón de seleccionar todas ------------------------------------------------
  const [enableAll, setEnableAll] = useState(false);
  function handleEnableAll() {
    setEnableAll(true);
  }

  return (
    <div>
      <Row gutter={[16, 16]} style={{ paddingBottom: "4%" }}>
        <Col span={10}>
          <Input placeholder="Buscar..." />
          <Checkbox style={{ marginTop: "3%" }} onChange={handleEnableAll}>
            {countSelected > 0
              ? countSelected + " palabras seleccionadas"
              : "Seleccionar todas"}
          </Checkbox>
        </Col>

        <Col span={14}>
          <Row justify={"end"}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              disabled={!enabledDeleteButton}
              danger
            >
              Eliminar
            </Button>
          </Row>
        </Col>
        <Col span={24}>
          <KeywordCardList
            keywordsFound={props.keywordsFound}
            enableDelete={handleEnabledDeleteButton}
            enableAll={enableAll}
          />
        </Col>
        <Col span={24}>
          <Row justify={"end"} gutter={[32, 32]}>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  props.changeStep(0);
                }}
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
