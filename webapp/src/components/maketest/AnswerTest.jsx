import React, {useState} from "react";
import { Button, Form, Input, Card, Col, Row, Alert } from "antd";
import { useTranslation } from "react-i18next";

function AnswerTest(props) {
  const { t } = useTranslation();

  return (
    <Row>
      <p>{props.student}</p>
      
    </Row>
  );
}

export default AnswerTest;
