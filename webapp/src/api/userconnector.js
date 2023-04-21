const apiendpoint = process.env.REACT_APP_API_URL;

class UsersConnector {
    
  async loginUser(username, password) {
    return await fetch(apiendpoint + "/api/v1.0/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username : username,
        password : password
      }),
    }).then((response) => response.json())
  }
}

export default UsersConnector;
