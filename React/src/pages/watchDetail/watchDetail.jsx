import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Rate,
  Row,
  Tooltip,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";
import {
  addCommentAPI,
  deleteCommentAPI,
  getDetailWatchAPI,
} from "../../service/watchAPI/watchAPI";
import AuthContext from "../../service/authAPI/authProvideAPI";
import Comment from "./components/comment";
const { Meta } = Card;

export default function WatchDetail() {
  const { watchId } = useParams();
  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDetailWatch = async (watchId) => {
    try {
      const response = await getDetailWatchAPI(watchId);
      setWatch(response.data);
    } catch (error) {
      console.error("Failed to fetch watch details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailWatch(watchId);
  }, [watchId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!watch) {
    return <div>Watch not found.</div>;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={5}>
          <Card
            style={{
              width: "100%", // Make the card width responsive
            }}
            cover={
              <img alt={watch.watchName || "Watch image"} src={watch.image} />
            }
          >
            <Meta
              title={watch.watchName}
              description={watch.brand?.brandName}
            />
            <p>{formatPrice(watch.price)}</p>
          </Card>
        </Col>
        <Col xs={24} sm={16}>
          <p>{watch.watchDescription}</p>
        </Col>
        <Col xs={24} sm={24}>
          <Comment ListComments={watch.comments} watchId={watch._id} />
        </Col>
      </Row>
    </>
  );
}
