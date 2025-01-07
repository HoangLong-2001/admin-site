import { Button, DatePicker, Flex, Form, Input, Modal, Radio,message } from "antd";
// import { useRef, useState } from "react";
// import generatePassword from "../../helpers/generatePassword";
import {
  updateAnEmployeeById,
} from "../../services/employService";

export default function ModalUpdate({
  isUpdateOpen,
  setUpdate,
  update,
  item,
  setUpdateOpen,
}) {
  const [form] = Form.useForm();
  const handleCancel = () => {
    setUpdateOpen(false);
  };

  const handleSubmit = async () => {
    const value = form.getFieldValue();
    console.log("check form value:", value);

    if (!value) return;
    try {
      if (value.birthDay) value.birthDay = value.birthDay.format("DD-MM-YYYY");
      const result = await updateAnEmployeeById(item._id, value);
      console.log(result);
      setUpdate(!update);
      form.resetFields();
      handleCancel();
    } catch (error) {
      console.error(error);
      message.error(
        "Sửa nhân viên không thành công.Vui lòng kiểm tra lại thông tin nhân viên "+`(${error.message})`
      )
      setUpdate(!update);
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <>
      <Modal
        open={isUpdateOpen}
        title="Cập nhật thông tin nhân viên"
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
          <Form.Item name={"name"} label="Họ và tên">
            <Input allowClear placeholder={item.name || " "}></Input>
          </Form.Item>
          <Form.Item name={"gender"} label="Giới tính">
            <Radio.Group defaultValue={item.gender || "male"}>
              <Radio value={"male"}>Nam</Radio>
              <Radio value={"female"}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"birthDay"} label="Ngày sinh">
            <DatePicker
              placeholder={item.birthDay || ""}
              format={"DD-MM-YYYY"}
              allowClear
            ></DatePicker>
          </Form.Item>
          <Form.Item name={"phoneNumber"} label="Số điện thoại">
            <Input placeholder={item.phoneNumber} allowClear></Input>
          </Form.Item>
          <Form.Item name={"email"} label="Email">
            <Input htmlType="email" placeholder={item.email} allowClear></Input>
          </Form.Item>
          <Form.Item name={"role"} label="Cấp bậc">
            <Radio.Group defaultValue={item.role || "admin"}>
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
