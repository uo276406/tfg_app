const apiendpoint = process.env.REACT_APP_API_URL;

class StudentQuestionConnector {
  async addStudentQuestion(studentId, questionId, option) {
    return await fetch(apiendpoint + "/api/v1.0/studentquestions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        question_id: questionId,
        option: option,
      }),
    }).then((response) => response.json());
  }

  async updateStudentQuestion(studentId, questionId, option) {
    return await fetch(apiendpoint + "/api/v1.0/studentquestions/update/"+studentId+"/"+questionId+"/"+option, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => response.json());
  }

}



export default StudentQuestionConnector;
