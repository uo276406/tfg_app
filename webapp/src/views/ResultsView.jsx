import React, { useState, useEffect } from "react";
import { Collapse, Row, Col, Typography, Switch, Spin, Table, Tag } from "antd";
import TestsConnector from "../api/testsconnector";
import { useTranslation } from "react-i18next";

const { Panel } = Collapse;
const { Paragraph, Title } = Typography;

const listStyle = {
  paddingLeft: "2%",
  paddingBottom: "2%",
  paddingRight: "2%",
  backgroundColor: "lightgray",
  overflow: "scroll",
  maxHeight: 475,
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    new TestsConnector()
      .findTestsResultsOfUser(props.accessToken)
      .then((response) => {
        console.log(response);
        setTests(response);
        console.log(response);
        setLoading(false);
      });
  }, [props.accessToken]);

  const getDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const changeTestState = (checked, event, id) => {
    event.stopPropagation();
    let TestConnector = new TestsConnector();
    TestConnector.changeTestState(id, checked, props.accessToken).then(
      (response) => {
        if (response.detail === "Test status updated") {
          console.log("updated");
        }
      }
    );
  };

  //Table settings
  const columns = [
    {
      title: t("id"),
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id),
        multiple: 1,
      },
    },
    {
      title: t("score"),
      dataIndex: "score",
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 2,
      },
    },
    {
      title: t("maxScore"),
      dataIndex: "maxScore",
    },
    {
      title: "Tags",
      dataIndex: "tags",
    },
  ];

  return (
    <Spin spinning={loading}>
      <Row style={listStyle}>
        <Title level={3}>{t("resultsTitle")}</Title>
        <Collapse style={collapseStyle}>
          {tests.length !== 0 ? (
            tests.map((test, index) => {
              return (
                <Panel
                  key={index}
                  header={
                    <Row style={panelStyle}>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Paragraph copyable={{ text: test.id }}>
                          {"Id: " + test.id}
                        </Paragraph>
                      </Col>
                      <Col xs={24} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        {getDate(test.created_at)}
                      </Col>
                      <Col xs={24} sm={6} md={6} lg={3} xl={3} xxl={3}>
                        <Switch
                          checkedChildren={t("closeTest")}
                          unCheckedChildren={t("openTest")}
                          defaultChecked={test.status}
                          onChange={(checked, event) =>
                            changeTestState(checked, event, test.id)
                          }
                        ></Switch>
                      </Col>
                    </Row>
                  }
                >
                  {test.students.length === 0 ? (
                    <p>{t("noStudentsInTest")}</p>
                  ) : (
                    <Table
                      columns={columns}
                      dataSource={test.students.map((student) => {
                        return {
                          "id": student.id,
                          "score": student.score,
                          "maxScore": student.max_score,
                          "tags":
                            student.score >= student.max_score/2 ? (
                              <Tag color="green">{t("passed")}</Tag>
                            ) : (
                              <Tag color="red">{t("failed")}</Tag>
                            ),
                        };
                      })}
                      pagination={false}
                    ></Table>
                  )}
                </Panel>
              );
            })
          ) : (
            <Title level={5}>{t("noTestFound")}</Title>
          )}
        </Collapse>
      </Row>
    </Spin>
  );
}

export default ResultsView;
