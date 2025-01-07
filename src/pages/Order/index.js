import React, { useEffect, useState } from "react";
import { Table, Input, Tag, Button, Modal, Flex, Select } from "antd";
import {
  deleteOrder,
  getAllOrder,
  updateOrder,
} from "../../services/orderService";
import { render } from "react-dom";
import useSearch from "../../hooks/useSearch";

const { Search } = Input;

export default function Order() {
  const [dataSource, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [deleteId, setDeleteId] = useState();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const { getColumnSearchProps } = useSearch();
  const handleCancel = () => {
    setOpen(false);
  };
  const handleDelete = async (id) => {
    try {
      await deleteOrder(id);
      setUpdate(!update);
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setUpdate(!update);
      console.log(error);
    }
  };
  const showModal = (id) => {
    setDeleteId(id);
    setOpen(true);
  };
  const handleOk = () => {
    handleDelete(deleteId);
  };
  const handleUpdate = async (id, data) => {
    try {
      await updateOrder(id, data);
      setUpdate(!update);
    } catch (e) {
      setUpdate(!update);
      console.log(e);
    }
  };
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "1",
      render: (value, { _id }) => {
        return <span>{_id.toUpperCase()}</span>;
      },
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customer_name",
      key: "2",
      ...getColumnSearchProps("customer_name"),
    },

    {
      title: "Ngày đặt hàng",
      dataIndex: "orderDate",
      key: "3",
      render: (_, { orderDate }) => {
        return (
          <span>
            {new Date(orderDate).toLocaleDateString() +
              " " +
              new Date(orderDate).getHours().toLocaleString() +
              ":" +
              new Date(orderDate).getMinutes().toLocaleString()}
          </span>
        );
      },
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "4",
      render: (_, record) => {
        let status = record.status;
        switch (status) {
          case "Delivered":
            return <Tag color="green">Đã giao</Tag>;
          case "Pending":
            return <Tag color="blue">Đang chờ giao</Tag>;
          case "Cancelled":
            return <Tag color="red">Đã hủy</Tag>;
          case "Shipped":
            return <Tag color="orange">Đang giao hàng</Tag>;
          default:
            return <Tag color="blue">Đang chờ giao</Tag>;
        }
      },
      filters: [
        {
          text: "Đã giao",
          value: "Delivered",
        },
        {
          text: "Đang chờ giao",
          value: "Pending",
        },
        {
          text: "Đã hủy",
          value: "Cancelled",
        },
        {
          text: "Đang giao hàng",
          value: "Shipped",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
      title: "Tông tiền",
      dataIndex: "totalAmount",
      key: "6",
      render: (_, { totalAmount }) => {
        return <span>{totalAmount.toLocaleString()}đ</span>;
      },
      sorter: (a, b) => a.totalAmount - b.totalAmount,
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "isPaid",
      key: "5",
      render: (_, { isPaid }) => {
        return isPaid ? (
          <Tag color="green">Đã thanh toán</Tag>
        ) : (
          <Tag color="red">Chưa thanh toán</Tag>
        );
      },
      filters: [
        {
          text: "Đã thanh toán",
          value: true,
        },
        {
          text: "Chưa thanh toán",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isPaid === value,
    },
    {
      title: "Hành động",
      key: "7",
      render: (_, record) => {
        return (
          <Flex gap="middle">
            <Select
              defaultValue={record.status}
              style={{ width: 120 }}
              onChange={(value) => handleUpdate(record._id, { status: value })}
            >
              <Select.Option value="Delivered">Đã giao</Select.Option>
              <Select.Option value="Pending">Đang chờ giao</Select.Option>
              <Select.Option value="Cancelled">Đã hủy</Select.Option>
              <Select.Option value="Shipped">Đang giao hàng</Select.Option>
            </Select>
            <Button color="danger" onClick={() => showModal(record._id)}>
              Xóa
            </Button>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllOrder();
        console.log(result);
        setData(result.data);
        setFilteredData(result.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [update]);
  return (
    <>
      <Modal
        title="Xác nhận"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn xóa đơn hàng này</p>
      </Modal>
      <Table dataSource={filteredData} columns={columns} rowKey="_id" />
    </>
  );
}
