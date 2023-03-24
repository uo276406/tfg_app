import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import SigninView from "./views/SigninView";
import TextProcessView from "./views/TextProcessView";
import SelectKeywordsView from "./views/SelectKeywordsView";


function App() {

  function func(loginUser) {
    console.log(loginUser);
    console.log("Cambiado " + loginUser.email);
    console.log("Cambiado " + loginUser.password);
  }

  // for not using Layout.Header, Layout.Footer, etc...
  const { Header, Content } = Layout;

  return (
    <Layout className="layout">
      <Header>
        <NavBarApp />
      </Header>

      <Content style={{ padding: "0 50px", backgroundColor: "lightGrey" }}>
        <Routes>
          <Route path="/" element={<HomeView />} />

          <Route
            path="/login"
            element={<LoginView sendLoginToConsole={func} />}
          />

          <Route
            path="/signin"
            element={<SigninView />}
          />

          <Route
            path="/textProcess"
            element={<TextProcessView/>}
          />

          <Route
            path="/selectKeywords"
            element={<SelectKeywordsView />}
          />

        </Routes>
      </Content>

      <FooterApp />
    </Layout>
  );
}

export default App;
