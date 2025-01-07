import { AppstoreAddOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Radio,
} from "antd";
import { useRef, useState } from "react";
import generatePassword from "../../helpers/generatePassword";
import { createAnEmployee } from "../../services/employService";

export default function ModalAdd({ update, setUpdate }) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
    setPassword("");
    form.resetFields();
  };
  const handleSubmit = async (value) => {
    try {
      value.password = passwordRef.current.input.value;
      value.birthDay = value.birthDay.format("DD-MM-YYYY");
console.log(value);

      const result = await createAnEmployee(value);
      console.log(result);
      setPassword("");
      form.resetFields();
      handleCancel();
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      setPassword("");
      form.resetFields();
      message.error(
        "Thêm nhân viên không thành công.Vui lòng kiểm tra lại thông tin nhân viên "+`(${error.message})`
      );
      handleCancel();
    }
  };
  const handelRandom = () => {
    setPassword(generatePassword());
  };
  return (
    <>
      <div className="mb-5 d-flex justify-content-end">
        <Button icon={<AppstoreAddOutlined />} onClick={showModal}>(
          Thêm nhân viên
        </Button>
      </div>
      <Modal
        open={open}
        title="Thêm nhân viên"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          className="mt-5"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 18,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item name={"name"} label="Họ và tên" required>
            <Input allowClear required></Input>
          </Form.Item>
          <Form.Item name={"gender"} label="Giới tính" required>
            <Radio.Group required>
              <Radio value={"male"}>Nam</Radio>
              <Radio value={"female"}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"birthDay"} label="Ngày sinh" required>
            <DatePicker format={"DD-MM-YYYY"} allowClear required></DatePicker>
          </Form.Item>
          <Form.Item name={"phoneNumber"} label="Số điện thoại" required>
            <Input allowClear required></Input>
          </Form.Item>
          <Form.Item name={"email"} label="Email" required>
            <Input htmlType="email" allowClear required></Input>
          </Form.Item>
          <Form.Item name={"password"} label="Mật khẩu đăng nhập" required>
            <Input.Password
              ref={passwordRef}
              value={password}
              allowClear
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Input.Password>

            <Button className="d-inline-block mt-4" onClick={handelRandom}>
              Random Password
            </Button>
          </Form.Item>
          <Form.Item name={"role"} label="Cấp bậc" required>
            <Radio.Group required>
              <Radio value={"admin"}>Quản lý</Radio>
              <Radio value={"staff"}>Nhân viên</Radio>
            </Radio.Group>
          </Form.Item>
          <Flex justify="end" gap={10}>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
