import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../helpers/cookie";
import { message } from "antd";

export default function useCheckRole() {
  const navigate = useNavigate();
  useEffect(() => {
    if (getCookie("role") !== "admin") {
      navigate("/");
      message.error("Bạn không có quyền truy cập chức năng này");
    }
  }, []);
}
