import React, { useState, useEffect } from "react";
import {
  Collapse,
  Row,
  Col,
  Typography,
  Switch,
  Spin,
  Table,
  Badge,
  notification,
  Button,
} from "antd";
import TestsConnector from "../api/testsconnector";
import { useTranslation } from "react-i18next";
import { CloudDownloadOutlined } from "@ant-design/icons";
import StudentQuestionsConnector from "../api/studentquestionsconnector";

const { Panel } = Collapse;
const { Paragraph, Title } = Typography;

const listStyle = {
  paddingLeft: "2%",
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

const buttonUpdateStyle = {
  marginTop: "1.5%",
  marginBottom: "0.5%",
};

function ResultsView(props) {
  const { t } = useTranslation();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: t("sessionExpired"),
      description: t("sessionExpiredDescription"),
    });
  };

  const [tests, setTests] = useState([]);
  const updateResults = async () => {
    setLoading(true);
    let tests = await new TestsConnector().findTestsResultsOfUser(
      props.accessToken
    );
    if (tests.detail !== "Unauthorized") {
      let updatedTests = await Promise.all(
        tests.map(async (test) => {
          let updatedStudent = await Promise.all(
            test.students.map(async (student) => {
              let addedNumer = new StudentQuestionsConnector()
                .getNumberAnsweredQuestions(student.id, test.id)
                .then((response) => {
                  return { ...student, answered: response["number_answered"] };
                });
              return addedNumer;
            })
          );
          return { ...test, students: updatedStudent };
        })
      );
      setLoading(false);
      console.log(updatedTests);
      setTests(updatedTests);
    } else if (tests.detail === "Unauthorized") {
      openNotificationWithIcon("info");
      return [];
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function update() {
      if (props.accessToken !== "") {
        await updateResults();
      }
    }
    update().catch((error) => { console.log(error); });
  }, []);

  const getDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + " " + d.toLocaleTimeString();
  };

  const changeTestState = async (checked, event, id) => {
    event.stopPropagation();
    let TestConnector = new TestsConnector();
    await TestConnector.changeTestState(id, checked, props.accessToken).then(
      (response) => {
        if (response.detail === "Test status updated") {
          console.log("updated");
        }
      }
    );
  };

  const getStateTag = (finished, score) => {
    if (finished) {
      if (score <= 5) {
        return <Badge status="error" text={t("failed")}></Badge>;
      } else {
        return <Badge status="success" text={t("passed")}></Badge>;
      }
    } else {
      return <Badge status="processing" text={t("inProgress")}></Badge>;
    }
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
      title: t("state"),
      dataIndex: "finished",
      sorter: {
        compare: (a, b) => a.finished - b.finished,
        multiple: 3,
      },
    },
    {
      title: t("answered"),
      dataIndex: "answered",
      sorter: {
        compare: (a, b) => a.answered - b.answered,
        multiple: 3,
      },
    },
  ];

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <Row style={listStyle}>
        <Col xs={24} sm={24} md={21} lg={21} xl={21} xxl={21}>
          <Title level={3}>{t("resultsTitle")}</Title>
        </Col>
        <Col
          style={buttonUpdateStyle}
          xs={24}
          sm={24}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
        >
          <Button
            type="primary"
            onClick={updateResults}
            icon={<CloudDownloadOutlined />}
          >
            {t("update")}
          </Button>
        </Col>

        <Collapse style={collapseStyle}>
          {tests.length !== 0 ? (
            tests.map((test, index) => {
              return (
                <Panel
                  key={test.id}
                  header={
                    <Row style={panelStyle}>
                      <Col xs={24} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <Paragraph
                          copyable={{ text: test.id, tooltips: t("copy") }}
                        >
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
                          defaultChecked={test.open}
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
                          key: student.id,
                          id: student.id,
                          score: student.score,
                          finished: getStateTag(
                            student.finished,
                            student.score
                          ),
                          answered: student.answered,
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
