import React from "react";
import { Row, Steps } from "antd";
import { useTranslation } from "react-i18next";


function Stepper(props) {

  const { t } = useTranslation();


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
            title: t("step1")
          },
          {
            title: t("step2"),
          },
          {
            title:t("step3"),
          },
        ]}
      />
    </Row>
  );
}

export default Stepper;
