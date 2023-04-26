const apiendpoint = process.env.REACT_APP_API_URL;

class QuestionsConnector {

  async getQuestions(text, keywords_selected) {
    console.log(keywords_selected)
    return await fetch(apiendpoint + "/api/v1.0/questions/generate", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_body : text,
        keywords_selected: keywords_selected
      }),
    }).then((response) => response.json())
  }
}

export default QuestionsConnector;
