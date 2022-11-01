import { Row, Col, Button, Pagination, Steps } from "antd";
import Header from "../components/RolesHeader";

export default function Roles2({ lj }: { lj?: boolean }) {
  return (
    <>
      <Header />

      <div
        style={{
          width: "50vw",
          margin: "auto",
          marginTop: "3vh",
        }}
      >
        <Steps current={1} labelPlacement="vertical">
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>
        <div style={{ color: "#3649F9", marginBottom: 20, marginTop: 20 }}>
          <Row gutter={[10, 10]}>
            <Col
              span={12}
              style={{
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              Role Selected:
            </Col>
            <Col span={12} style={{ textAlign: "left", fontWeight: 450 }}>
              Role Name
            </Col>
            <Col
              span={12}
              style={{
                textAlign: "right",
                fontWeight: 700,
              }}
            >
              Skills Selected:
            </Col>
            <Col span={12} style={{ textAlign: "left", fontWeight: 450 }}>
              Skill Name
            </Col>
          </Row>
        </div>
      </div>
      <Row style={{ marginTop: "6vh", fontWeight: 700 }}>
        <Col span={12} style={{ textAlign: "right" }}>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
        <Col offset={4} span={3} style={{ textAlign: "right" }}>
          <Button
            type="default"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              background: "",
              borderRadius: 5,
            }}
          >
            Back
          </Button>
        </Col>
        <Col offset={1} span={3} style={{ textAlign: "left" }}>
          <Button
            className="border btn-color"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "black",
              background: "",
              borderRadius: 5,
            }}
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
}
