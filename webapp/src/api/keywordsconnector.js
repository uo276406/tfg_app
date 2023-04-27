const apiendpoint = process.env.REACT_APP_API_URL;

class KeywordsConnector {
  async getKeywords(text, accessToken) {
    return await fetch(apiendpoint + "/api/v1.0/keywords/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
      body: JSON.stringify({
        text_body: text,
      }),
    }).then((response) => response.json());
  }
}

export default KeywordsConnector;
