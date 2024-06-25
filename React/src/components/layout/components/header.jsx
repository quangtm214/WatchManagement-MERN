import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Avatar, Dropdown, Space, Button } from "antd";
import { MdArrowDropDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GiTennisCourt } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import AuthContext from "../../../service/authAPI/authProvideAPI";

export default function HeaderLayout() {
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const logouthander = async () => {
    navigate("/");
    const result = await logout();
    console.log("userlogout", result);
  };

  const itemsAdmin = [
    {
      label: (
        <Link to="/user">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <GiTennisCourt size="20px" />
            <>Thông tin cá nhân</>
          </div>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
          onClick={logouthander}
        >
          <CiLogout size="20px" />
          <>Đăng xuất</>
        </div>
      ),
      key: "2",
    },
  ];

  const itemsCustomer = [
    {
      label: (
        <Link to="/personal">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <GiTennisCourt size="20px" />
            <>Personal Information</>
          </div>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
          onClick={logouthander}
        >
          <CiLogout size="20px" />
          <>Logout</>
        </div>
      ),
      key: "2",
    },
  ];

  const items = user?.isAdmin ? itemsAdmin : itemsCustomer;

  const menuItemsUser = [
    {
      key: "1",
      label: "Home",
      path: "/",
    },
  ];

  const menuItemsAdmin = [
    { key: "1", label: "Home", path: "/" },
    { key: "2", label: "Manage Watch", path: "/WatchManagement" },
    { key: "3", label: "Manage Brand", path: "/BrandManagement" },
    {
      key: "4",
      label: "Manage User",
      path: "/UserManagement",
    },
  ];

  const menuItems = user?.isAdmin ? menuItemsAdmin : menuItemsUser;

  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();

  useEffect(() => {
    const selectedItem = menuItems.find(
      (item) => item.path === location.pathname
    );
    if (selectedItem) {
      setSelectedKey(selectedItem.key);
    }
  }, [location.pathname, menuItems]);

  return (
    <>
      <>
        <Menu
          mode="horizontal"
          selectedKeys={[selectedKey]}
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: "24px",
            background: "#5797E3",
          }}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} style={{ color: "white" }}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </>
      {user ? (
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {user?.avatar ? (
                <Avatar
                  size="large"
                  src={user.avatar}
                  style={{ background: "white", height: "50px", width: "50px" }}
                />
              ) : (
                <Avatar
                  size="large"
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                  style={{ background: "white", height: "50px", width: "50px" }}
                />
              )}
              <MdArrowDropDown
                style={{ display: "flex", alignItems: "center" }}
                color="white"
                size="30px"
              />
            </Space>
          </a>
        </Dropdown>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/login" style={{ paddingRight: "20px" }}>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <CgProfile size="20px" />
              <>Login</>
            </Button>
          </Link>
          <Link to="/signup" style={{ margin: "0 20px" }}>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <FaUserPlus size="20px" />
              <>Signup</>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
