import { Route, Routes } from "react-router-dom";
import LayoutMain from "../components/layout";
import Home from "../pages/home";
import Login from "../pages/login";
import WatchDetail from "../pages/watchDetail/watchDetail";
import SignUp from "../pages/signup";
import Personal from "../pages/personal";
import WatchManagement from "../pages/manageWatch.jsx";
import BrandManagement from "../pages/manageBrand.jsx/index.jsx";
import UserManagement from "../pages/managerMember/index.jsx";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<LayoutMain />}>
        <Route index element={<Home />} />
        <Route path="/watch/:watchId" element={<WatchDetail />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/WatchManagement" element={<WatchManagement />} />
        <Route path="/BrandManagement" element={<BrandManagement />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="" />
      </Route>
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/signup" element={<SignUp />} />
      {/* 
      
     
      <Route path="/signupPartner" element={<SignupPartner />} />
      <Route path="/no-access" element={<NoAccess />} /> */}
    </Routes>
  );
}

export default Routing;
