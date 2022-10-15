import { Tag, Button, Card } from "antd";
import role from "../assets/role.png";

export default function CourseCard() {
  return (
    <Card
      bordered={false}
      style={{ width: 280, borderRadius: 10, background: "#FAFAFA" }}
    >
      <Tag
        color="#F3A1A9"
        style={{
          borderRadius: 5,
          fontSize: 13,
          fontWeight: "Bold",
          color: "#FF0000",
          marginTop: -20,
          marginLeft: 180,
        }}
      >
        Missing
      </Tag>
      <p>
        <img src={role} alt="role icon" className="icon" />
      </p>
      <p
        className="card-row"
        style={{ fontSize: 18, fontWeight: "Bold", marginTop: 20 }}
      >
        Role Name
      </p>
      <Button className="border btn-color" style={{ fontWeight: "500" }}>
        Read More
      </Button>
    </Card>
  );
}
