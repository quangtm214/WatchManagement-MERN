import React from "react";
import { Card } from "antd";
import { formatPrice } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";
const { Meta } = Card;
export default function WatchCard({ watch }) {
  return (
    <div>
      <Link to={`/watch/${watch._id}`}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={
            <img
              alt="example"
              src={watch.image} // Change this line
            />
          }
        >
          <Meta title={watch.watchName} description={watch.brand.brandName} />
          <p>{formatPrice(watch.price)}</p>
        </Card>
      </Link>
    </div>
  );
}
