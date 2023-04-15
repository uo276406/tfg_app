import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SigninView from "./views/SigninView";
import ProcessView from "./views/ProcessView";
import DocView from "./views/DocView";
import "./i18n";

/**
 * The main component of the application. Renders the layout of the app and the different views based on the current route.
 * @returns {JSX.Element} - The JSX element of the App component.
 */
function App() {
  function func(loginUser) {
    console.log(loginUser);
    console.log("Cambiado " + loginUser.email);
    console.log("Cambiado " + loginUser.password);
  }

  // for not using Layout.Header, Layout.Footer, etc...
  const { Header, Content } = Layout;

  const contentStyle = {
    backgroundColor: "lightGrey",
  };

  return (
    <Layout className="layout">
      <Header>
        <NavBarApp />
      </Header>

      <Content style={contentStyle}>
        <Routes>
          <Route path="/" element={<HomeView />} />

          <Route
            path="/login"
            element={<LoginView sendLoginToConsole={func} />}
          />

          <Route path="/signin" element={<SigninView />} />

          <Route path="/process" element={<ProcessView />} />

          <Route path="/doc" element={<DocView />} />
          
        </Routes>
      </Content>

      <FooterApp />
    </Layout>
  );
}

export default App;
