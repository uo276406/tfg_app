const apiendpoint = process.env.REACT_APP_API_URL;

class UsersConnector {
  async loginUser(username, password) {
    console.log(apiendpoint)
    let details = {
      username: username,
      password: password,
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return await fetch(apiendpoint + "/api/v1.0/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: formBody,
    }).then((response) => response.json());
  }

  async signinUser(name, surname1, surname2, username, password) {
    let details = {
      name: name,
      surname1: surname1,
      surname2: surname2,
      email: username,
      password: password,
    };
    return await fetch(apiendpoint + "/api/v1.0/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    }).then((response) => response.json());
  }
}

export default UsersConnector;
