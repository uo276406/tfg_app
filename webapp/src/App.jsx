import { useState } from "react";
import { Layout } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SigninView from "./views/SigninView";
import ProcessView from "./views/ProcessView";
import DocView from "./views/DocView";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./i18n";

/**
 * The main component of the application. Renders the layout of the app and the different views based on the current route.
 * @returns {JSX.Element} - The JSX element of the App component.
 */
function App() {
  // for not using Layout.Header, Layout.Footer, etc...
  const { Header, Content } = Layout;

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

            {accessToken !== "" ? (
              <>
                <Route
                  path="/logout"
                  element={<HomeView accessToken={accessToken} />}
                />
                <Route
                  path="/process"
                  accessToken={accessToken}
                  element={<ProcessView />}
                />
                <Route
                  path="*"
                  element={<HomeView accessToken={accessToken} />}
                />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  element={<LoginView updateAccessToken={updateAccessToken} />}
                />
                <Route
                  path="/signin"
                  element={<SigninView updateAccessToken={updateAccessToken} />}
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
