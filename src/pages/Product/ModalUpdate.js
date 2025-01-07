import {
  Button,
  Flex,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
} from "antd";
import { Form, Modal } from "antd";
import { updateAProduct } from "../../services/productService";
import { UploadOutlined } from "@ant-design/icons";
export default function ModalUpdate({
  isUpdateOpen,
  setUpdate,
  update,
  item,
  setUpdateOpen,
}) {
  const handleCancel = () => {
    setUpdateOpen(false);
  };
  console.log("check item:", item);

  const handleSubmit = async (value) => {
    console.log("check value:", value.newArrival);

    const formData = new FormData();
    Object.keys(value).forEach((key) => {
      if (!value[key]) delete value[key];
      if (key === "images" && value[key]) {
        value[key].fileList?.forEach((file) =>
          formData.append(key, file.originFileObj)
        );
      } else if (value[key]) {
        if (value[key] instanceof Array) {
          value[key].forEach((item) => formData.append(key, item));
        } else {
          if (key === "newArrival") {
            if (value[key] === 2) {
              formData.append(key, true);
            } else {
              formData.append(key, false);
            }
          } else {
            formData.append(key, value[key]);
          }
        }
      }
    });
    console.log("check formData:", formData.getAll("newArrival"));

    try {
      const result = await updateAProduct(item._id, formData);
      console.log(result);
      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }

    handleCancel();
  };
  return (
    <>
      <Modal
        open={isUpdateOpen}
        title={"Cập nhật sản phẩm"}
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
          <Form.Item name="title" label="Tên sản phẩm">
            <Input placeholder={item.title || ""}></Input>
          </Form.Item>
          <Form.Item name="description" label="Mô tả sản phẩm">
            <Input.TextArea
              placeholder={item.description || ""}
              maxLength={3000}
              autoSize
              showCount
            ></Input.TextArea>
          </Form.Item>
          <Form.Item name="brand" label="Thương hiệu">
            <Input placeholder={item.brand}></Input>
          </Form.Item>
          <Form.Item name={"price"} label="Giá sản phẩm">
            <Input
              placeholder={item.price || 0}
              htmlType="number"
              min={0}
              width={"100%"}
            ></Input>
          </Form.Item>
          <Form.Item name={"discount"} label="Giảm  giá">
            <InputNumber
              placeholder={item.discount || 0}
              max={1}
              min={0}
         
            ></InputNumber>
          </Form.Item>
          <Form.Item name={"stock"} label="Số lượng">
            <InputNumber
              placeholder={item.stock}
              max={1000}
              min={0}
            ></InputNumber>
          </Form.Item>
          <Form.Item name="category" label="Loại sản phẩm">
            <Radio.Group value={item.category || "shirt"}>
              <Radio value="shirt"> Áo</Radio>
              <Radio value="trousers"> Quần</Radio>
              <Radio value="shoes"> Giày</Radio>
              <Radio value="accessory">Phụ kiện</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Select
              placeholder={item.tags?.join(",") || ""}
              allowClear
              mode="multiple"
              maxTagCount={3}
              required
            >
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
          <Form.Item name="sports" label="Dòng thể thao" required>
            <Select allowClear mode="multiple" maxTagCount={3} required>
              <Select.Option value="FOOTBALL">Bóng đá</Select.Option>
              <Select.Option value="BASKETBALL">Bóng rổ</Select.Option>
              <Select.Option value="TENNIS">Tennis</Select.Option>
              <Select.Option value="GOLF">Golf</Select.Option>
              <Select.Option value="RUNNING">Chạy bộ</Select.Option>
              <Select.Option value="SPORT">Thể thao</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="genders" label="Dành cho">
            <Select
              placeholder={item.genders?.join(",") || ""}
              allowClear
              mode="multiple"
              maxTagCount={3}
            >
              <Select.Option value="MEN">Nam</Select.Option>
              <Select.Option value="WOMEN">Nữ</Select.Option>
              <Select.Option value="KIDS">Trẻ em</Select.Option>
              <Select.Option value="BOYS">Bé trai</Select.Option>
              <Select.Option value="GIRLS">Bé gái</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="colors" label="Màu sắc">
            <Select
              placeholder={item.colors?.join(",") || ""}
              allowClear
              mode="multiple"
              maxTagCount={3}
            >
              <Select.Option value="RED">ĐỎ</Select.Option>
              <Select.Option value="BLUE">Xanh lam</Select.Option>
              <Select.Option value="GREEN">Xanh lục</Select.Option>
              <Select.Option value="WHITE">Trắng</Select.Option>
              <Select.Option value="BLACK">Đen</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="sizes" label="Kích thước">
            <Select
              placeholder={item.sizes?.join(",") || ""}
              mode="multiple"
              maxTagCount={6}
            >
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
          <Form.Item name="newArrival" label="Sản phẩm mới">
            <Radio.Group>
              <Radio value={2}>Đúng</Radio>
              <Radio value={1}>Sai</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={"images"} label="Ảnh sản phẩm">
            <Upload multiple>
              <Button icon={<UploadOutlined />}>Upload Ảnh</Button>
            </Upload>
          </Form.Item>
          <Flex gap={10} align="center">
            {item.images?.map((image, index) => (
              <div key={index}>
                <Image width={60} src={image} />
              </div>
            ))}
          </Flex>
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
