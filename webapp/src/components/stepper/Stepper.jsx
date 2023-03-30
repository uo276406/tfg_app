import React from "react";
import { Row, Steps } from "antd";

const inputText = "Introduzca el texto que desee";
const selectKeywords = "Elija las palabras clave que más se adecúen";
const selectQuestions = "Seleccione las preguntas más interesantes";

function Stepper(props) {
  return (
    <Row
      style={{
        height: "25%",
        paddingLeft: "10%",
        paddingRight: "10%",
        paddingTop: "5%",
        paddingBottom: "5%",
      }}
    >
      <Steps
        direction="horizontal"
        current={props.step}
        labelPlacement="vertical"
        items={[
          {
            title: "Procesar texto",
            inputText,
          },
          {
            title: "Seleccione las palabras clave",
            selectKeywords,
          },
          {
            title: "Seleccione las preguntas",
            selectQuestions,
          },
        ]}
      />
    </Row>
  );
}

export default Stepper;
