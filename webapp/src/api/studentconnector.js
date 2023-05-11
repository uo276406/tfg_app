const apiendpoint = process.env.REACT_APP_API_URL;

class StudentsConnector {
  async findStudentInTest(studentId, testId) {
    return await fetch(apiendpoint + "/api/v1.0/students/" + studentId + "/test/" + testId, {
      method: "GET",
    }).then((response) => response.json());
  }

  async addStudent(studentId, testId) {
    return await fetch(apiendpoint + "/api/v1.0/students/add/" + studentId + "/test/" + testId, {
      method: "GET",
    }).then((response) => response.json());
  }

}


export default StudentsConnector;
