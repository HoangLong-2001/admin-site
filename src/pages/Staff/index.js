import { Button, message, Modal, Table,Input,Space } from "antd";
import { useEffect, useRef, useState } from "react";
import useCheckRole from "../../hooks/useCheckRole";
import { deleteAnEmployee, getAllEmployee } from "../../services/employService";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import { get } from "../../utils/request";
import useSearch from "../../hooks/useSearch";
export default function Staff() {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const [item, setItem] = useState({});
  const {getColumnSearchProps} = useSearch();
  useCheckRole();
  const showModal = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleOk = () => {
    handleDelete(id);
  };

 
  const columns = [
    {
      key: "1",
      title: "Họ và tên",
      dataIndex: "name",
      align: "center",
      ...getColumnSearchProps('name')
    },
    {
      key: "2",
      title: "Ngày sinh",
      dataIndex: "birthDay",
      align: "center",
    },
    {
      key: "3",
      title: "Giới tính",
      dataIndex: "gender",
      align: "center",
      filters:[
        {
          text: "Nam",
          value:'male'
        },{
          text: "Nữ",
          value:'female'
        }
      ],
      onFilter: (value,record) => record.gender.indexOf(value) === 0,
      render: (_, { gender }) => {
        let gt;
        switch (gender) {
          case "male":
            gt = "Nam";
            break;
          case "female":
            gt = "Nữ";
            break;
        }
        return <>{gt}</>;
      },
    },

    {
      key: "4",
      title: "Cấp bậc",
      dataIndex: "role",
      align: "center",
      render: (_, { role }) => {
        switch (role) {
          case "admin":
            return <>Quản lý</>;
          case "staff":
            return <>Nhân viên</>;
        }
      },
    },
    {
      key: "5",
      title: "Liên hệ",
      dataIndex: "phoneNumber",
      align: "center",
    },
    {
      key: "6",
      title: "Email",
      dataIndex: "email",
      align: "center",
      ...getColumnSearchProps('email')
    },
    {
      key: "7",
      title: "Sửa/Xóa",
      render: (_, record) => {
        return (
          <div className="d-flex gap-2">
            <Button
              color="primary"
              onClick={() => {
                setItem(record);
                setUpdateOpen(true);
              }}
            >
              Sửa
            </Button>
            <Button onClick={() => showModal(record._id)}>Xóa</Button>
          </div>
        );
      },
    },
  ];
  const handleDelete = async (id) => {
    try {
      const result = await deleteAnEmployee(id);
      console.log(result);
      setOpen(false);
      setUpdate(!update);
    } catch (error) {
      message.error(error.message);
      setOpen(false);
    }
  };
  const handleCancel = async () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await getAllEmployee();
        setData(result.data);
        console.log(result);
      } catch (error) {
        console.log(error);
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
        <p>Bạn có chắc muốn xóa nhân viên này</p>
      </Modal>
      <ModalUpdate
        item={item}
        isUpdateOpen={isUpdateOpen}
        setUpdateOpen={setUpdateOpen}
        update={update}
        setUpdate={setUpdate}
      ></ModalUpdate>
      <ModalAdd update={update} setUpdate={setUpdate}></ModalAdd>
      <Table columns={columns} dataSource={data} rowKey="_id"></Table>
    </>
  );
}
