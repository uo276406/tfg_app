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

  const contentStyle = {
    backgroundColor: "lightGrey",
  };

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <NavBarApp />
        </Header>

        <Content style={contentStyle}>
          <Routes>
            <Route path="/" element={<HomeView />} />

            <Route path="/login" element={<LoginView />} />

            <Route path="/signin" element={<SigninView />} />

            <Route path="/process" element={<ProcessView />} />

            <Route path="/doc" element={<DocView />} />
          </Routes>
        </Content>

        <FooterApp />
      </Layout>
    </Router>
  );
}

export default App;
