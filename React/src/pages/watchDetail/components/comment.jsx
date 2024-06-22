import {
  Button,
  Card,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Rate,
  Tooltip,
} from "antd";
import { CiMenuKebab } from "react-icons/ci";

import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../service/authAPI/authProvideAPI";
import { useNavigate } from "react-router-dom";
import {
  addCommentAPI,
  deleteCommentAPI,
  editCommentAPI,
  getDetailWatchAPI,
} from "../../../service/watchAPI/watchAPI";

export default function Comment({ ListComments, watchId }) {
  const { user } = useContext(AuthContext);
  console.log("user", user);
  const navigate = useNavigate();

  const [comments, setComments] = useState(ListComments);
  const [remountKey, setRemountKey] = useState(0);
  const [haveComment, setHaveComment] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const addComment = async (comment) => {
    try {
      setSelectedComment(null);
      const response = await addCommentAPI(watchId, comment);
      console.log("response", response);
      const watch = await getDetailWatchAPI(watchId);
      console.log("watch", watch);
      setComments(watch.data.comments);
    } catch (error) {
      console.error("Failed to fetch watch details:", error);
    }
  };

  const deleteComment = async () => {
    try {
      const response = await deleteCommentAPI(watchId, selectedComment._id);
      console.log("response", response);
      const watch = await getDetailWatchAPI(watchId);
      console.log("watch", watch);
      setSelectedComment(null);
      setComments(watch.data.comments);
    } catch (error) {
      console.error("Failed to fetch watch details:", error);
    }
  };

  const editComment = async (watchId, comment) => {
    try {
      const response = await editCommentAPI(watchId, comment);
      console.log("response", response);
      const watch = await getDetailWatchAPI(watchId);
      console.log("watch", watch);
      setSelectedComment(null);
      setComments(watch.data.comments);
    } catch (error) {
      console.error("Failed to fetch watch details:", error);
    }
  };

  const showModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteComment();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalEdit = (comment) => {
    setSelectedComment(comment);
    setIsModalOpenEdit(true);
  };

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false);
  };

  const handleOnFinish = (values) => {
    if (!user) {
      navigate("/login");
    }
    addComment({ content: values.content, rating: values.rating });
  };

  const handleOnFinishEdit = async (values) => {
    setIsModalOpenEdit(false);
    console.log("values", values);
    if (selectedComment) {
      selectedComment.content = values.content;
      selectedComment.rating = values.rating;
      console.log("selectedComment", selectedComment);
      if (!user) {
        navigate("/login");
      }
      editComment(watchId, selectedComment);
    }
  };

  useEffect(() => {
    console.log("comments", comments);
    if (user && user.isAdmin) {
      setHaveComment(true);
    }
    if (user && !user.isAdmin) {
      if (comments) {
        const hasUserCommented = comments.some(
          (comment) => comment.author._id === user.id
        );
        setHaveComment(hasUserCommented);
        console.log("haveComment set to:", hasUserCommented);
      }
    }
    setRemountKey((prevKey) => prevKey + 1);
  }, [comments]);

  return (
    <div key={remountKey}>
      <p>Comment</p>
      <div style={{ height: "50vh", overflowY: "auto" }}>
        {comments.map((comment) => (
          <Tooltip
            title={`Created at: ${new Date(
              comment.createdAt
            ).toLocaleDateString()}`}
            key={comment._id}
          >
            <Card
              style={{
                marginBottom: "16px",
                backgroundColor: "#f0f2f5",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              bodyStyle={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong
                    style={{
                      color:
                        user && user.id === comment.author._id
                          ? "#8CB2DF"
                          : "inherit",
                    }}
                  >
                    {comment.author.membername}
                  </strong>
                </p>
                {user && comment.author._id === user.id && (
                  <>
                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item
                            key="1"
                            onClick={() => showModalEdit(comment)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item key="2" onClick={() => showModal(comment)}>
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

                    <Modal
                      title="Edit"
                      open={isModalOpenEdit}
                      onCancel={handleCancelEdit}
                      footer={null}
                    >
                      <Form layout="inline" onFinish={handleOnFinishEdit}>
                        <Form.Item
                          name="content"
                          initialValue={comment?.content}
                          rules={[
                            {
                              required: true,
                              message: "Please input your comment!",
                            },
                          ]}
                          style={{ flexGrow: 1 }} // Đảm bảo đầu vào mở rộng đầy đủ chiều rộng
                        >
                          <Input.TextArea
                            rows={1}
                            placeholder="Write a comment..."
                            style={{ resize: "none" }} // Ngăn chặn người dùng thay đổi kích thước
                          />
                        </Form.Item>
                        <Form.Item
                          name="rating"
                          initialValue={comment?.rating}
                          rules={[
                            {
                              required: true,
                              message: "Please provide a rating!",
                            },
                          ]}
                        >
                          <Rate
                            defaultValue={selectedComment?.rating}
                            count={3}
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Submit
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                  </>
                )}
              </div>
              <Rate disabled defaultValue={comment.rating} count={3} />
              <p style={{ margin: "8px 0 0 0" }}>{comment.content}</p>{" "}
              {/* Ensure content wraps correctly */}
            </Card>
          </Tooltip>
        ))}
      </div>
      {!haveComment && (
        <Form layout="inline" onFinish={handleOnFinish}>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: "Please input your comment!",
              },
            ]}
            style={{ flexGrow: 1 }} // Đảm bảo đầu vào mở rộng đầy đủ chiều rộng
          >
            <Input.TextArea
              rows={1}
              placeholder="Write a comment..."
              style={{ resize: "none" }} // Ngăn chặn người dùng thay đổi kích thước
            />
          </Form.Item>
          <Form.Item
            name="rating"
            rules={[
              {
                required: true,
                message: "Please provide a rating!",
              },
            ]}
          >
            <Rate count={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
      <Modal
        title="Delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Delete this comment</p>
      </Modal>
    </div>
  );
}
