const apiendpoint = process.env.REACT_APP_API_URL;

class TestsConnector {
  async addTest(accessToken, questions) {
    return await fetch(apiendpoint + "/api/v1.0/test/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        questions: questions,
      }),
    }).then((response) => response.json());
  }

  async findTestsResultsOfUser(accessToken) {
    return await fetch(apiendpoint + "/api/v1.0/test/find/results", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }).then((response) => response.json());
  }

  async getTest(testId) {
    return await fetch(apiendpoint + "/api/v1.0/test/" + testId, {
      method: "GET",
    }).then((response) => response.json());
  }

  async checkTest(testId, studentId, studentSelection) {
    console.log(
      JSON.stringify({
        selection: studentSelection,
        testId: testId,
        studentId: studentId,
      })
    );
    return await fetch(apiendpoint + "/api/v1.0/test/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selection: studentSelection,
        testId: testId,
        studentId: studentId,
      }),
    }).then((response) => response.json());
  }

  async changeTestState(id, checked, accessToken) {
    return await fetch(apiendpoint + "/api/v1.0/test/changestatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({
        id: id,
        open: checked,
      }),
    }).then((response) => response.json());
  }
}

export default TestsConnector;
