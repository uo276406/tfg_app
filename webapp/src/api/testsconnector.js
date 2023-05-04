const apiendpoint = process.env.REACT_APP_API_URL;

class TestsConnector {
  async addTest(accessToken, questions) {
    return await fetch(apiendpoint + "/api/v1.0/test/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify({
        "questions": questions,
      }),
    }).then((response) => response.json());
  }

  async getTest(testId) {
    return await fetch(apiendpoint + "/api/v1.0/test/" + testId, {
      method: "GET",
    }).then((response) => response.json());
  }

}




export default TestsConnector;
