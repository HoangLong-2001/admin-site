import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import logo from "../../assets/adminLogo.svg";
import {
  LogoutOutlined,
  MenuOutlined,
  ProductOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { delete_cookie, getCookie } from "../../helpers/cookie";
export default function LayoutDefault() {
  const [collapse, setCollapse] = useState(false);
  const navigate = useNavigate();
  const handelLogOut = () => {
    delete_cookie("accessToken");
    delete_cookie("refreshToken");
    delete_cookie("role");
    delete_cookie("expireT");
    navigate("/login");
  };
  const menuItems = [
    {
      key: "1",
      label: (
        <Link className="text-decoration-none" to="/">
          Quản lý sản phẩm
        </Link>
      ),

      icon: <ProductOutlined />,
    },
    {
      key: "2",
      label: (
        <Link className="text-decoration-none" to="/staff">
          Quản lý nhân viên
        </Link>
      ),
      icon: <UnorderedListOutlined />,
    },
    {
      key: "3",
      label: (
        <Link className="text-decoration-none" to="/order">
          Quản lý đơn hàng
        </Link>
      ),
      icon: <UnorderedListOutlined />,
    },
    {
      key: "4",
      label: (
        <Link className="text-decoration-none" to="/account">
          Quản lý tài khoản
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "5",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handelLogOut,
    },
  ];
  useToken();
  // const dropItems = [{ key: "1", label: "notification" }];
  useEffect(() => {
    const token = getCookie("refreshToken");
    if (!token) navigate("/login");
  }, [getCookie("accessToken")]);
  return (
    <>
      <Layout className="bg-transparent vh-100 ">
        <Layout.Sider
          className="border bg-secondary-subtle"
          theme="light"
          width={250}
          collapsed={collapse}
        >
          <div className="text-center">
            <Avatar
              shape="square"
              size={80}
              src={<img src={logo} alt="logo" />}
            />
          </div>
          <Menu
            className="bg-transparent"
            defaultSelectedKeys={["1"]}
            items={menuItems}
          />
        </Layout.Sider>
        <Layout className="bg-transparent">
          <header className="d-flex justify-content-between align-items-center py-4 px-4">
            <Button
              icon={<MenuOutlined />}
              onClick={() => {
                setCollapse(!collapse);
              }}
            ></Button>
            {/* <Dropdown menu={{ dropItems }}>
              <Button></Button>
            </Dropdown> */}
          </header>
          <Layout.Content className="overflow-y-scroll px-4 py-5">
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </>
  );
}
