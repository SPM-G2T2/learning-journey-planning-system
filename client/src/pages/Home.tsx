import { Row, Col, Steps } from "antd";
import CourseCard from "../components/CourseCard";

export default function Roles({ lj }: { lj?: boolean }) {
  return (
    <>
      <h1 style={{ fontWeight: 700 }}>Create Your Desired Learning Journey</h1>

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
        <Row gutter={[50, 40]}>
          <Col span={8}>
            <CourseCard />
          </Col>
          <Col span={8}>
            <CourseCard />
          </Col>
          <Col span={8}>
            <CourseCard />
          </Col>
          <Col span={8}>
            <CourseCard />
          </Col>
          <Col span={8}>
            <CourseCard />
          </Col>
          <Col span={8}>
            <CourseCard />
          </Col>
        </Row>
      </div>
    </>
  );
}
