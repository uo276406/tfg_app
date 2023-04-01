const apiendpoint = process.env.API_URL || 'http://localhost:8000';

class KeywordsConnector {
  constructor(text) {
    this.text = text;
  }

  async getKeywords() {
    return await fetch(apiendpoint + "/api/v1.0/keywords", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_body : this.text,
      }),
    }).then((response) => response.json())
  }
}

export default KeywordsConnector;
