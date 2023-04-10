const apiendpoint = process.env.REACT_APP_API_URL;

class QuestionsConnector {
  constructor(text, selectedKeywords) {
    this.text = text;
    this.selectedKeywords = selectedKeywords
  }

  async getQuestions() {
    return await fetch(apiendpoint + "/api/v1.0/questions/generate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_body : this.text,
        keywords_selected: this.selectedKeywords
      }),
    }).then((response) => response.json())
  }
}

export default QuestionsConnector;
