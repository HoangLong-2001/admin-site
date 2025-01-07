import { Button, Flex, Table, Tag, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { deleteAProduct, getAllProducts } from "../../services/productService";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import priceFormat from "../../helpers/priceFormat";
import useSearch from "../../hooks/useSearch";
export default function Product() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [item, setItem] = useState({});
  const { getColumnSearchProps } = useSearch();
  const handleCancel = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteAProduct(id);
      setOpen(false);
      setUpdate(!update);
    } catch (error) {
      setUpdate(!update);
      console.log(error);
    }
  };
  const showModal = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleOk = () => {
    handleDelete(id);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
      align: "left",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
      key: "brand",
      align: "center",
      filters: [...new Set(data.map((item) => item.brand))].map((item) => ({
        text: item,
        value: item,
      })),
      onFilter: (value, record) => record.brand.indexOf(value) === 0,
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
      render: (_, { category }) => {
        let color;
        switch (category) {
          case "SHIRT":
            color = "#666c8c";
            break;
          case "TROUSERS":
            color = "#112ed1";
            break;
          case "SHOES":
            color = "#bf0b35";
            break;
          case "ACCESSORY":
            color = "#bcc44f";
            break;
        }
        return <Tag color={color}>{category}</Tag>;
      },
      align: "center",
    },
    {
      title: "Dành cho",
      dataIndex: "genders",
      key: "genders",
      render: (_, { genders }) => {
        return (
          <>
            {genders.map((gender) => {
              let color;
              switch (gender) {
                case "MEN":
                  color = "#3b737a";
                  break;
                case "WOMEN":
                  color = "#a623b8";
                  break;
                case "KIDS":
                  color = "#76d6c3";
                  break;
                case "GIRLS":
                  color = "#d77be3";
                  break;
                case "BOYS":
                  color = "#7b8ae3";
                  break;
              }
              return (
               <Flex wrap gap={5} >
                  <Tag color={color} key={gender}>
                    {gender.toUpperCase()}
                  </Tag>
               </Flex>
              );
            })}
          </>
        );
      },
      align: "left",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => {
        return (
          <Flex wrap gap={5}>
            {" "}
            {tags.map((tag) => (
              <Tag color="green" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))}
          </Flex>
        );
      },
      align: "left",
    },
    {
      title: "Dòng sản phẩm",
      dataIndex: "sports",
      key: "sports",
      render: (_, { sports }) => {
        return (
          <Flex wrap gap={5}>
            {" "}
            {sports.map((sport) => (
              <Tag color="green" key={sport}>
                {sport.toUpperCase()}
              </Tag>
            ))}
          </Flex>
        );
      },
      align: "left",
    },
    {
      title: "Gía tiền",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      align: "center",
      render: (_, { price }) => {
        return <>{priceFormat(price)}</>;
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
      align: "center",
      render: (_, { discount }) => {
        return discount * 100 + "%";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "stock",
      key: "stock",
      align: "center",
    },
    {
      title: "Sửa/Xóa",
      key: "action",
      render: (_, record) => {
        return (
          <Flex gap="middle">
            <Button
              color="primary"
              onClick={() => {
                setItem(record);
                setUpdateOpen(true);
              }}
            >
              Sửa
            </Button>
            <Button
              type="danger"
              color="danger"
              onClick={() => showModal(record._id)}
            >
              Xóa
            </Button>
          </Flex>
        );
      },
      align: "center",
    },
  ];
  useEffect(() => {
    (async () => {
      try {
        const result = await getAllProducts();
        setData(result.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [update]);
  return (
    <div className="p-4 pt-2">
      <Modal
        title="Xác nhận"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa sản phẩm này</p>
      </Modal>
      <ModalUpdate
        item={item}
        isUpdateOpen={isUpdateOpen}
        setUpdateOpen={setUpdateOpen}
        update={update}
        setUpdate={setUpdate}
      ></ModalUpdate>
      <ModalAdd setUpdate={setUpdate} update={update} />
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ y: 500 }}
        rowKey="_id"
      />
    </div>
  );
}
