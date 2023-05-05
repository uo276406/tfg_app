import React, { useState, useEffect } from "react";
import { Collapse, Row, Col, Typography, notification } from "antd";
import TestsConnector from "../api/testsconnector";
import ResultSummaryCard from "../components/resultsummary/ResultSummaryCard";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;
const { Paragraph, Title } = Typography;

const listStyle = {
  paddingLeft: "2%",
  paddingBottom: "2%",
  paddingRight: "2%",
  backgroundColor: "lightgray",
  overflow: "scroll",
  maxHeight: 450,
};

const collapseStyle = {
  width: "100%",
  backgroundColor: "white",
};

const panelStyle = {
  fontSize: "1.1em",
  fontWeight: "bold",
};

function ResultsView(props) {
  const [api, contextHolder] = notification.useNotification();

  const { t } = useTranslation();

  const [tests, setTests] = useState([]);

  useEffect(() => {
    new TestsConnector()
      .findTestsResultsOfUser(props.accessToken)
      .then((response) => {
        setTests(response);
      })
      .catch((error) => {
        openNotificationWithIcon("info");
      });
  }, []);

  const getDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: t("sessionExpired"),
      description: t("sessionExpiredDescription"),
    });
  };

  return (
    <Row style={listStyle}>
      {contextHolder}
      <Title level={3}>{t("resultsTitle")}</Title>
      <Collapse style={collapseStyle}>
        { tests.length != 0 ? tests.map((test, index) => {
          return (
            <Panel
              key={index}
              header={
                <Row style={panelStyle}>
                  <Col xs={24} sm={18} md={18} lg={21} xl={21} xxl={21}>
                    <Paragraph copyable={{ text: test.id }}>
                      {"Id: " + test.id}
                    </Paragraph>
                  </Col>
                  <Col xs={24} sm={6} md={6} lg={3} xl={3} xxl={3}>
                    {getDate(test.created_at)}
                  </Col>
                </Row>
              }
            >
              {test.students.length === 0 ? (
                <p>{t("noStudentsInTest")}</p>
              ) : (
                test.students.map((student, index) => {
                  return <ResultSummaryCard key={index} student={student} />;
                })
              )}
            </Panel>
          );
        }) : <Title level={5}>{t("noTestFound")}</Title>}
      </Collapse>
    </Row>
  );
}

export default ResultsView;
