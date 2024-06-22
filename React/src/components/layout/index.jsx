import { Outlet } from "react-router-dom";
import { Layout, theme } from "antd";
import HeaderLayout from "./components/header";

const { Header, Content, Footer } = Layout;

const LayoutMain = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          background: "#5797E3",
        }}
      >
        <HeaderLayout />
      </Header>
      <Content
        style={{
          flexGrow: 1,
          padding: "0 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};
export default LayoutMain;
