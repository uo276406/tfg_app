import React, { useState, useEffect } from "react";
import { Collapse, Row, Col, Typography } from "antd";
import TestsConnector from "../api/testsconnector";
import ResultSummaryCard from "../components/resultsummary/ResultSummaryCard";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;
const { Paragraph } = Typography;

const listStyle = {
  padding: "2%",
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
  const { t } = useTranslation();

  const [tests, setTests] = useState([]);

  useEffect(() => {
    new TestsConnector()
      .findTestsResultsOfUser(props.accessToken)
      .then((response) => {
        setTests(response);
      });
  }, []);

  const getDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  return (
    <Row style={listStyle}>
      <Collapse style={collapseStyle}>
        {tests.map((test, index) => {
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
        })}
      </Collapse>
    </Row>
  );
}

export default ResultsView;
