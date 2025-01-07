import { Button, DatePicker, Flex, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import { getAnEmployee, updateAnEmployee } from "../../services/employService";
import useCheckRole from "../../hooks/useCheckRole";
export default function Account() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // useCheckRole();
  useEffect(() => {
    (async () => {
      try {
        const result = await getAnEmployee();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleEdit = () => {
    setEdit(!edit);
  };
  const handleSubmit = async (value, url) => {
    if (value.birthDay) value.birthDay = value.birthDay.format("DD-MM-YYYY");
    Object.keys(value).forEach((key) => {
      if (!value[key]) delete value[key];
    });
    console.log(value, url);
    try {
      await updateAnEmployee(url, value);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      message.success("Cập nhật thành công");
    } catch (error) {
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
      console.error(error);
      message.warning(
        `Cập nhật không thành công. Vui lòng kiểm tra lại. (${
          error.message || "no content"
        })`
      );
    }
  };
  return (
    <div className="w-50 m-auto">
      <Flex justify="space-between">
        <p className="display-6 pb-3 fw-normal">Thông tin tài khoản</p>
        <Button onClick={handleEdit}>Edit</Button>
      </Flex>
      <Form
        labelCol={{
          span: 4,
        }}
        onFinish={(value) => handleSubmit(value, "employee")}
      >
        <Form.Item name="name" label="Họ và tên">
          <Input placeholder={data.name} disabled={!edit} allowClear></Input>
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input placeholder={data.email} disabled allowClear></Input>
        </Form.Item>
        <Form.Item name={"birthDay"} label="Ngày sinh">
          <DatePicker
            placeholder={data.birthDay}
            format={"DD-MM-YYYY"}
            disabled={!edit}
            allowClear
          ></DatePicker>
        </Form.Item>
        <Form.Item name="gender" label="Giới tính">
          <Select
            placeholder={data.gender === "male" ? "Nam" : "Nữ"}
            disabled={!edit}
            allowClear
          >
            <Select.Option value="male">Nam</Select.Option>
            <Select.Option value="female">Nữ</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Cấp bậc">
          <Input placeholder={data.role} disabled allowClear></Input>
        </Form.Item>
        <Flex gap={10} justify="end">
          <Button>Hủy</Button>
          <Button type="primary" htmlType="submit" disabled={!edit}>
            Cập nhật
          </Button>
        </Flex>
      </Form>
      <p className="display-6 mt-4 fw-normal">Cập nhật mật khẩu</p>
      <Form
        labelCol={{
          span: 7,
        }}
        onFinish={(value) => {
          if (value.newPassword !== value.confirmPassword) {
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
            message.warning(
              `Mật khẩu xác nhận không khớp.
              - Mật khẩu phải chứa ít nhất một ký tự in Hoa,in thường,chữ số. 
              - Mật khẩu khẩu có ít nhất 8 ký tự và tối đa 16 ký tự.`
            );
            return;
          }
          delete value.confirmPassword
          handleSubmit(value, "employee/password");
        }}
      >
        <Form.Item required name="password" label="Mật khẩu hiện tại">
          <Input.Password
            disabled={!edit}
            required
            placeholder={password}
            onChange={(e) => setPassword(e.target.value)}
            allowClear
          />
        </Form.Item>
        <Form.Item required name={"newPassword"} label="Mật khẩu mới">
          <Input.Password
            disabled={!edit}
            required
            placeholder={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            allowClear
          />
        </Form.Item>
        <Form.Item
          required
          name={"confirmPassword"}
          label="Xác nhận mật khẩu mới"
        >
          <Input.Password
            disabled={!edit}
            required
            placeholder={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            allowClear
          />
        </Form.Item>
        <Flex gap={10} justify="end">
          <Button>Hủy</Button>
          <Button type="primary" htmlType="submit" disabled={!edit}>
            Cập nhật
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
