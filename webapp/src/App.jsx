import { Route, Routes } from "react-router-dom";
import { Layout, Col, Row } from "antd";
import FooterApp from "./components/footer/FooterApp";
import NavBarApp from "./components/navbar/NavBarApp";
import LoginForm from "./views/LoginForm";
import HomePage from "./views/HomePage";

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

      <Content style={{ padding: "0 50px", backgroundColor: "#2F4F4F" }}>
        <div className="site-layout-content">
          <Row style={{ marginTop: 34 }}>
            <Col span={24}>
              <Routes>
                <Route path="/" element={<HomePage />} />

                <Route
                  path="/login"
                  element={<LoginForm sendLoginToConsole={func} />}
                />

              </Routes>
            </Col>
          </Row>
        </div>
      </Content>

      <FooterApp />
    </Layout>
  );
}

export default App;
