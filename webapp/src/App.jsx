import { useState } from "react";
import { Layout } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SigninView from "./views/SigninView";
import ProcessView from "./views/ProcessView";
import DocView from "./views/DocView";
import ProfileView from "./views/ProfileView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n";
import ResultsView from "./views/ResultsView";
import TestView from "./views/TestView";

/**
 * The main component of the application. Renders the layout of the app and the different views based on the current route.
 * @returns {JSX.Element} - The JSX element of the App component.
 */
function App() {
  const { Header, Content } = Layout;

  // Token de acceso ------------------------------------------------
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );

  const updateAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    setAccessToken("");
  };
  // ----------------------------------------------------------------
  // Información usuario----------------------------------------------

  const updateUser = (user) => {
    let newUser = {"name": user.name, "surname1": user.surname1, "surname2": user.surname2, "email": user.email}
    console.log(newUser)
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  const contentStyle = {
    backgroundColor: "lightGrey",
  };

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <NavBarApp
            accessToken={accessToken}
            clearLocalStorage={clearLocalStorage}
          />
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<HomeView accessToken={accessToken} />} />

            <Route path="/doc" element={<DocView />} />

            {accessToken === "" || accessToken === null ? (
              <>
                <Route
                  path="/login"
                  element={<LoginView updateAccessToken={updateAccessToken} updateUser={updateUser} />}
                />
                <Route
                  path="/signin"
                  element={<SigninView updateAccessToken={updateAccessToken} updateUser={updateUser}/>}
                />
                <Route
                  path="/test"
                  element={<TestView />}
                />
                <Route
                  path="*"
                  element={<HomeView accessToken={accessToken} />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/logout"
                  element={<HomeView accessToken={accessToken} />}
                />
                <Route
                  path="/process"
                  element={<ProcessView accessToken={accessToken} />}
                />
                <Route
                  path="/profile"
                  element={<ProfileView />}
                />
                <Route
                  path="/results"
                  element={<ResultsView accessToken={accessToken}/>}
                />
                <Route
                  path="*"
                  element={<HomeView accessToken={accessToken} />}
                />
              </>
            )}
          </Routes>
        </Content>

        <FooterApp />
      </Layout>
    </Router>
  );
}

export default App;
