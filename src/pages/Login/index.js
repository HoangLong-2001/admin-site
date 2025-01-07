import "./Login.scss";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logoAd from "../../assets/adminLogo.svg";
import { loginValidation } from "../../helpers/validate";
import { login } from "../../services/authService";
import { getCookie, setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    const isValid = loginValidation(value);
    if (!isValid) {
      message.warning("Email hoặc mật khẩu không đúng định dạng");
      return;
    }
    try {
      const result = await login({ ...value, role: getCookie("role") });
      console.log(result);
      setCookie("accessToken", result["accessToken"], 1 / 60 / 24);
      setCookie("refreshToken", result["refreshToken"], 60 / 60 / 24);
      setCookie("expireT", Date.now(), 1 / 60 / 24);
      setCookie("role", result.role);
      navigate("/");
    } catch (error) {
      console.log(error);
      message.warning(error.message);
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="mw-50 px-3 pt-5 border rounded-5 text-center">
        <img className="w-25 " src={logoAd} alt="logo" />
        <Form labelCol={{ span: 6 }} onFinish={handleSubmit}>
          <Form.Item name={"email"} label="Username" required>
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item name="password" label="Password" required>
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              type="password"
            />
          </Form.Item>
          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
