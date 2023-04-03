import React from "react";
import { Row, Steps } from "antd";

const inputText = "Introduzca el texto que desee";
const selectKeywords = "Elija las palabras clave que más se adecúen";
const selectQuestions = "Seleccione las preguntas más interesantes";

function Stepper(props) {
  return (
    <Row
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingTop: "2%",
        paddingBottom: "1%",
        marginTop: "2%",
        backgroundColor: "white",
        borderRadius: "15px"
      }}
    >
      <Steps
        direction="horizontal"
        current={props.step}
        labelPlacement="vertical"
        items={[
          {
            title: "Introduzca el texto 😀",
            inputText,

          },
          {
            title: "Seleccione las palabras más interesantes 🤔",
            selectKeywords,
          },
          {
            title: "Seleccione las preguntas 😉",
            selectQuestions,
          },
        ]}
      />
    </Row>
  );
}

export default Stepper;
