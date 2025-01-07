import { AppstoreAddOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Input, InputNumber, Radio, Select, Upload } from "antd";
import { Form, Modal } from "antd";
import { addAProduct } from "../../services/productService";
import { useRef, useState } from "react";

export default function ModalAdd({ isUpdateOpen, setUpdate, update }) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setOpen(true);
  };
  // const handleOk = () => {
  //   setUpdate(!update);
  //   setOpen(false);
  // };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const handleSubmit = async (value) => {
    console.log("check value:", value);

    const formData = new FormData();
    Object.keys(value).forEach((key) => {
      if (key === "images") {
        value[key].fileList?.forEach((file) =>
          formData.append(key, file.originFileObj)
        );
      } else {
        if (value[key] instanceof Array) {
          value[key].forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value[key]);
        }
        console.log(">>> check form data:", formData.get(key));
      }
    });
    try {
      const result = await addAProduct(formData);
      form.resetFields();
      setUpdate(!update);
    } catch (error) {
      console.log(error);
      form.resetFields();
    }

    handleCancel();
  };
  return (
    <>
      <div className="mb-5 d-flex justify-content-end">
        <Button icon={<AppstoreAddOutlined />} onClick={showModal}>
          Thêm sản phẩm
        </Button>
      </div>
      <Modal
        form={form}
        open={open}
        title={"Thêm sản phẩm"}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          className="pt-5"
          labelCol={{
            span: 6,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item name="title" label="Tên sản phẩm" required>
            <Input required></Input>
          </Form.Item>
          <Form.Item name="description" label="Mô tả sản phẩm">
            <Input.TextArea
              maxLength={300}
              autoSize
              style={{ maxHeight: 100, "overflow-y": "scroll", minHeight: 100 }}
              showCount
            ></Input.TextArea>
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu" required>
            <Input required formatter={(str) => str.toUpperCase()}></Input>
          </Form.Item>
          <Form.Item name={"price"} label="Giá sản phẩm" required>
            <Input type="number" min={0} width={"100%"} required></Input>
          </Form.Item>
          <Form.Item name={"discount"} label="Giảm  giá" required>
            <InputNumber min={0} max={1}  required></InputNumber>
          </Form.Item>
          <Form.Item name={"stock"} label="Số lượng" required>
            <InputNumber max={1000} min={0}></InputNumber>
          </Form.Item>
          <Form.Item name="category" label="Loại sản phẩm" required>
            <Radio.Group value={"shirt"}>
              <Radio value="shirt"> Áo</Radio>
              <Radio value="trousers"> Quần</Radio>
              <Radio value="shoes"> Giày</Radio>
              <Radio value="accessory">Phụ kiện</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="tags" label="Tags" >
            <Select allowClear mode="multiple" maxTagCount={3}>
              <Select.Option value="BALO">Balo</Select.Option>
              <Select.Option value="CAP">Mũ</Select.Option>
              <Select.Option value="SOCKS">Tất</Select.Option>
              <Select.Option value="Jackets">Áo khoác</Select.Option>
              <Select.Option value="hoodie">Áo hoodie</Select.Option>
              <Select.Option value="POLO">Áo Polo</Select.Option>
              <Select.Option value="T-shirt">Áo T-shirt</Select.Option>
              <Select.Option value="Long-pants">Quần dài</Select.Option>
              <Select.Option value="Shorts">Quần short</Select.Option>
              <Select.Option value="drawers">Quần đùi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="sports" label="Dòng thể thao" >
            <Select allowClear mode="multiple" maxTagCount={3}>
              <Select.Option value="FOOTBALL">Bóng đá</Select.Option>
              <Select.Option value="BASKETBALL">Bóng rổ</Select.Option>
              <Select.Option value="TENNIS">Tennis</Select.Option>
              <Select.Option value="GOLF">Golf</Select.Option>
              <Select.Option value="RUNNING">Chạy bộ</Select.Option>
              {/* <Select.Option value="SPORT">Thể thao</Select.Option> */}
            </Select>
          </Form.Item>
          <Form.Item name="genders" label="Dành cho" required>
            <Select allowClear mode="multiple" maxTagCount={3}>
              <Select.Option value="MEN">Nam</Select.Option>
              <Select.Option value="WOMEN">Nữ</Select.Option>
              <Select.Option value="KIDS">Trẻ em</Select.Option>
              <Select.Option value="BOYS">Bé trai</Select.Option>
              <Select.Option value="GIRLS">Bé gái</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="colors" label="Màu sắc" required>
            <Input></Input>
          </Form.Item>
          <Form.Item name="sizes" label="Kích thước" required>
            <Select mode="multiple" maxTagCount={6} required>
              <Select.Option value="XS">XS</Select.Option>
              <Select.Option value="S">S</Select.Option>
              <Select.Option value="M">M</Select.Option>
              <Select.Option value="L">L</Select.Option>
              <Select.Option value="XL">XL</Select.Option>
              <Select.Option value="XXL">XXL</Select.Option>
              <Select.Option value="4">4</Select.Option>
              <Select.Option value="4.5">4.5</Select.Option>
              <Select.Option value="6">6</Select.Option>
              <Select.Option value="6.5">6.5</Select.Option>
              <Select.Option value="7">7</Select.Option>
              <Select.Option value="7.5">7.5</Select.Option>
              <Select.Option value="8">8</Select.Option>
              <Select.Option value="8.5">8.5</Select.Option>
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="11">11</Select.Option>
              <Select.Option value="11.5">11.5</Select.Option>
              <Select.Option value="23">12</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name={"newArrival"} label="Sản phẩm mới" required>
            <Radio.Group required>
              <Radio value={true}>Đúng</Radio>
              <Radio value={false}>Sai</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"images"} label="Ảnh sản phẩm" required>
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Ảnh sản phẩm</Button>
            </Upload>
          </Form.Item>
          <Flex gap={10} justify="end">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}
