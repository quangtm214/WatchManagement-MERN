import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Typography, message } from "antd";
import {
  addBrandAPI,
  deleteBrandAPI,
  getBrandAPI,
  updateBrandAPI,
} from "../../service/brandAPI/brandAPI";

const { Title } = Typography;

const BrandManagement = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [editBrand, setEditBrand] = useState(null);
  const [deleteBrand, setDeleteBrand] = useState(null);
  const [brands, setBrands] = useState([]);

  const getBrands = async () => {
    try {
      const response = await getBrandAPI();
      console.log("response", response.data);
      setBrands(response.data);
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  const addBrand = async (brand) => {
    const response = await addBrandAPI(brand);
    console.log("response", response);
    if (response.status === 201) {
      message.success("Create brand successfully");
    }
    getBrands();
  };

  const updateBrand = async (brandId, brand) => {
    const response = await updateBrandAPI(brandId, brand);
    if (response.status === 201) {
      message.success("Update brand successfully");
    }
    console.log("response", response);
    getBrands();
  };

  const removeBrand = async (brandId) => {
    const response = await deleteBrandAPI(brandId);
    if (response.status === 401) {
      message.error(response.data.data.message);
    }
    if (response.status === 204) {
      message.success("Delete brand successfully");
    }
    console.log("response", response);
    getBrands();
  };

  useEffect(() => {
    getBrands();
  }, []);

  const showModal = (type, brand = null) => {
    if (type === "add") {
      setIsAddModalVisible(true);
    } else if (type === "edit") {
      setEditBrand(brand);
    } else if (type === "delete") {
      setDeleteBrand(brand);
    }
  };

  const handleCancel = (type) => {
    if (type === "add") {
      setIsAddModalVisible(false);
    } else if (type === "edit") {
      setEditBrand(null);
    } else if (type === "delete") {
      setDeleteBrand(null);
    }
  };

  const handleAddBrand = (values) => {
    console.log("Add Brand:", values);
    addBrand(values);
    setIsAddModalVisible(false);
  };

  const handleEditBrand = (values) => {
    console.log("Edit Brand:", values);
    updateBrand(editBrand._id, values);
    setEditBrand(null);
  };

  const handleDeleteBrand = () => {
    if (deleteBrand) {
      console.log("Delete Brand:", deleteBrand._id);
      removeBrand(deleteBrand._id);
      setDeleteBrand(null);
    }
  };

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
      key: "brandName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" onClick={() => showModal("edit", record)}>
            Edit
          </Button>{" "}
          <Button type="danger" onClick={() => showModal("delete", record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container">
      <Title level={1}>Brand Management</Title>
      <Button type="primary" onClick={() => showModal("add")}>
        Add Brand
      </Button>
      <Table
        dataSource={brands}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />

      <Modal
        title="Add New Brand"
        visible={isAddModalVisible}
        onCancel={() => handleCancel("add")}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddBrand}>
          <Form.Item
            label="Brand Name"
            name="brandName"
            rules={[
              { required: true, message: "Please input the brand name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {editBrand && (
        <Modal
          title="Edit Brand"
          visible={Boolean(editBrand)}
          onCancel={() => handleCancel("edit")}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleEditBrand}>
            <Form.Item
              label="Brand Name"
              name="brandName"
              initialValue={editBrand.brandName}
              rules={[
                { required: true, message: "Please input the brand name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      {deleteBrand && (
        <Modal
          title="Confirm Delete This Brand"
          visible={Boolean(deleteBrand)}
          onCancel={() => handleCancel("delete")}
          footer={[
            <Button key="cancel" onClick={() => handleCancel("delete")}>
              Cancel
            </Button>,
            <Button key="delete" type="danger" onClick={handleDeleteBrand}>
              Delete
            </Button>,
          ]}
        >
          <p>
            Are you sure you want to delete {deleteBrand.brandName} brand? This
            action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default BrandManagement;
