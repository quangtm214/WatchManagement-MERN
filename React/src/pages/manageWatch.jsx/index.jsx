import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Typography,
  Dropdown,
  Menu,
} from "antd";
import {
  addWatchAPI,
  deleteWatchAPI,
  getWatchAPI,
  updateWatchAPI,
} from "../../service/watchAPI/watchAPI";
import { CiMenuKebab } from "react-icons/ci";

const { Title } = Typography;
const { Option } = Select;

const WatchManagement = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editWatch, setEditWatch] = useState(null);
  const [deleteWatch, setDeleteWatch] = useState(null);
  const [watches, setWatches] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const getWatches = async () => {
    try {
      const response = await getWatchAPI();
      console.log("response", response.data);
      setWatches(response.data.watches);
      setBrands(response.data.brands);
    } catch (error) {
      console.error("Failed to fetch watches:", error);
    }
  };
  const addWatch = async (watch) => {
    const response = await addWatchAPI(watch);
    console.log("response", response);
    getWatches();
  };

  const updateWatch = async (watchId, watch) => {
    watch = { ...watch, Automatic: isAutomatic };
    const response = await updateWatchAPI(watchId, watch);
    console.log("response", response);
    getWatches();
  };

  const removeWatch = async (watchId) => {
    const response = await deleteWatchAPI(watchId);
    console.log("response", response);
    getWatches();
  };

  useEffect(() => {
    getWatches();
  }, []);

  const showModal = (type, watch = null) => {
    if (type === "add") {
      setIsAddModalVisible(true);
    } else if (type === "edit") {
      setEditWatch(watch);
      setIsAutomatic(watch.Automatic);
    } else if (type === "delete") {
      setDeleteWatch(watch);
    }
  };

  const handleCancel = (type) => {
    if (type === "add") {
      setIsAddModalVisible(false);
    } else if (type === "edit") {
      setEditWatch(null);
    } else if (type === "delete") {
      setDeleteWatch(null);
    }
  };

  const handleAddWatch = (values) => {
    console.log("Add Watch:", values);
    // Thêm API call ở đây
    addWatch(values);
    setIsAddModalVisible(false);
  };

  const handleEditWatch = (values) => {
    console.log("Edit Watch:", values);
    updateWatch(editWatch._id, values);
    // Thêm API call ở đây
    setEditWatch(null);
  };

  const handleDeleteWatch = () => {
    if (deleteWatch) {
      console.log("Delete Watch:", deleteWatch._id);
      removeWatch(deleteWatch._id);
      // Thêm API call ở đây
      setDeleteWatch(null);
    }
  };

  const handleCheckboxChange = (e) => {
    setIsAutomatic(e.target.checked);
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Watch Name",
      dataIndex: "watchName",
      key: "watchName",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="watch" style={{ width: "100px" }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Automatic",
      dataIndex: "Automatic",
      key: "Automatic",
      render: (Automatic) => (Automatic ? "Yes" : "No"),
    },
    {
      title: "Description",
      dataIndex: "watchDescription",
      key: "watchDescription",
    },
    {
      title: "Brand",
      dataIndex: ["brand", "brandName"],
      key: "brandName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {/* <Dropdown overlay={menu}>
            <Button type="primary" onClick={() => showModal("edit", record)}>
              Edit
            </Button>{" "}
            <Button type="danger" onClick={() => showModal("delete", record)}>
              Delete
            </Button>
          </Dropdown> */}

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="1" onClick={() => showModal("edit", record)}>
                  Edit
                </Menu.Item>
                <Menu.Item key="2" onClick={() => showModal("delete", record)}>
                  Delete
                </Menu.Item>
              </Menu>
            }
            placement="bottomLeft"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Button type="text" icon={<CiMenuKebab />} />
          </Dropdown>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <Title level={1}>Watch Management</Title>
      <Button type="primary" onClick={() => showModal("add")}>
        Add Watch
      </Button>
      <Table
        dataSource={watches}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />

      <Modal
        title="Add New Watch"
        visible={isAddModalVisible}
        onCancel={() => handleCancel("add")}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddWatch}>
          <Form.Item
            label="Watch Name"
            name="watchName"
            rules={[
              { required: true, message: "Please input the watch name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="Automatic" valuePropName="checked">
            <Checkbox>Automatic</Checkbox>
          </Form.Item>
          <Form.Item
            label="Description"
            name="watchDescription"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please select a brand!" }]}
          >
            <Select placeholder="Select a brand">
              {brands.map((brand, index) => (
                <Option key={index} value={brand._id}>
                  {brand.brandName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {editWatch && (
        <Modal
          title="Edit Watch"
          visible={Boolean(editWatch)}
          onCancel={() => handleCancel("edit")}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleEditWatch}>
            <Form.Item
              label="Watch Name"
              name="watchName"
              initialValue={editWatch.watchName}
              rules={[
                { required: true, message: "Please input the watch name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="image"
              initialValue={editWatch.image}
              rules={[
                { required: true, message: "Please input the image URL!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              initialValue={editWatch.price}
              rules={[{ required: true, message: "Please input the price!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="Automatic">
              <Checkbox checked={isAutomatic} onChange={handleCheckboxChange}>
                Automatic
              </Checkbox>
            </Form.Item>
            <Form.Item
              label="Description"
              name="watchDescription"
              initialValue={editWatch.watchDescription}
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Brand"
              name="brand"
              initialValue={editWatch.brand._id}
              rules={[{ required: true, message: "Please select a brand!" }]}
            >
              <Select
                placeholder="Select a brand"
                defaultValue={editWatch.brand.brandName}
              >
                {brands.map((brand, index) => (
                  <Option key={index} value={brand._id}>
                    {brand.brandName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {deleteWatch && (
        <Modal
          title="Confirm Delete This Watch"
          visible={Boolean(deleteWatch)}
          onCancel={() => handleCancel("delete")}
          footer={[
            <Button key="cancel" onClick={() => handleCancel("delete")}>
              Cancel
            </Button>,
            <Button key="delete" type="danger" onClick={handleDeleteWatch}>
              Delete
            </Button>,
          ]}
        >
          <p>
            Are you sure you want to delete {deleteWatch.watchName} watch? This
            action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default WatchManagement;
