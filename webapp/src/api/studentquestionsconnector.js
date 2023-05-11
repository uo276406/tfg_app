const apiendpoint = process.env.REACT_APP_API_URL;

class StudentQuestionConnector {
  async addStudentQuestion(studentId, questionId, index) {
    return await fetch(apiendpoint + "/api/v1.0/studentquestions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: studentId,
        question_id: questionId,
        answer: index,
      }),
    }).then((response) => response.json());
  }

}

export default StudentQuestionConnector;