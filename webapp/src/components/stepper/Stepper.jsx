import React from "react";
import { Row, Steps } from "antd";
import { useTranslation } from "react-i18next";

const stepperStyle = {
  paddingLeft: "5%",
  paddingRight: "5%",
  paddingTop: "2%",
  paddingBottom: "1%",
  margin: "2%",
  backgroundColor: "white",
  borderRadius: "15px",
};

/**
 * A component that displays a horizontal stepper with the given steps.
 * @param {{Object}} props - The props object for the component.
 * @param {{number}} props.step - The current step of the stepper.
 * @returns A React component that displays a horizontal stepper.
 */
function Stepper(props) {
  const { t } = useTranslation();

  return (
    <Row
      style={stepperStyle}
    >
      <Steps
        direction="horizontal"
        current={props.step}
        labelPlacement="vertical"
        items={[
          {
            title: t("step1"),
          },
          {
            title: t("step2"),
          },
          {
            title: t("step3"),
          },
        ]}
      />
    </Row>
  );
}

export default Stepper;
