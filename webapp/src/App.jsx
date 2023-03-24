import { Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import HomePage from "./views/HomePage";
import LoginForm from "./views/LoginForm";
import SigninForm from "./views/SigninForm";
import TextProcess from "./views/TextProcess";


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
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={<LoginForm sendLoginToConsole={func} />}
          />

          <Route
            path="/signin"
            element={<SigninForm />}
          />

          <Route
            path="/textProcess"
            element={<TextProcess/>}
          />
        </Routes>
      </Content>

      <FooterApp />
    </Layout>
  );
}

export default App;
