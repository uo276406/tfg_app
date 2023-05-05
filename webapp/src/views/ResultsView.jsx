import React, { useState, useEffect } from "react";
import { Collapse, Row, Col } from "antd";
import TestsConnector from "../api/testsconnector";
import ResultSummaryCard from "../components/resultsummary/ResultSummaryCard";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;

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

  return (
    <Row style={listStyle}>
      <Collapse style={collapseStyle}>
        {tests.map((test, index) => {
          return (
            <Panel
              style={panelStyle}
              key={index}
              header={
                <Row>
                  <Col xs={24} sm={24} md={14} lg={16} xl={16} xxl={16} >{"Id: " + test.id}</Col>
                  <Col xs={24} sm={24} md={10} lg={8} xl={8} xxl={8}>{t("createdAt") + ": " + test.created_at}</Col>
                </Row>
              }
            >
              {test.students.map((student, index) => {
                return <ResultSummaryCard key={index} student={student} />;
              })}
            </Panel>
          );
        })}
      </Collapse>
    </Row>
  );
}

export default ResultsView;
