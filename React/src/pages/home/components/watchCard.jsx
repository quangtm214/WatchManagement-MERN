import { Card } from "antd";
import { formatPrice } from "../../../utils/formatPrice";
import { Link } from "react-router-dom";

const { Meta } = Card;

export default function WatchCard({ watch }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to={`/watch/${watch._id}`}>
        <Card
          hoverable
          style={{
            width: 320,
          }}
          cover={
            <div
              style={{
                width: "100%",
                height: 240,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                alt="example"
                src={watch.image}
                style={{
                  width: "auto",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          }
        >
          <Meta title={watch.watchName} description={watch.brand.brandName} />
          <p>{formatPrice(watch.price)}</p>
        </Card>
      </Link>
    </div>
  );
}
