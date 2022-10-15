import { Row, Col, Button, Pagination, Steps } from 'antd';
import Header from '../components/RolesHeader';
import RoleCourseCard from '../components/RoleCourseCard';
import Roles2 from './Skills';

export default function Roles({ lj }: { lj?: boolean }) {
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
        <Steps labelPlacement="vertical">
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>
        <p style={{ textAlign: "center", margin: "3vh 0 4vh 0", color: "#3649F9", fontWeight: 700 }}>Role Selected:</p>

        <RoleCourseCard />
        <RoleCourseCard />
        <RoleCourseCard />
        <RoleCourseCard />
      </div>
      <Row style={{ marginTop: "2vh", fontWeight: 700 }}>
        <Col span={12} style={{ textAlign: "right" }}>
          <Pagination defaultCurrent={1} total={50} />
        </Col>
        <Col offset={8} span={3} style={{ textAlign: "left" }}>
          <Button className="border btn-color" style={{ fontSize: 14, fontWeight: 500, color: "black", background: "", borderRadius: 5 }}>Next</Button>
        </Col>
      </Row>
    </>
  );
}
