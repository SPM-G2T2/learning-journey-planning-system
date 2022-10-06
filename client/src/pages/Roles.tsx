import { Steps } from 'antd';
import RoleCourseCard from '../components/RoleCourseCard';

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
        <Steps labelPlacement="vertical">
          <Steps.Step title="Choose a role" />
          <Steps.Step title="Choose skills" />
          <Steps.Step title="Choose courses" />
        </Steps>
        <p style={{ textAlign: "center", margin:"3vh 0 4vh 0", color:"#3649F9", fontWeight:700 }}>Role Selected:</p>

        <RoleCourseCard />
        <RoleCourseCard />
        <RoleCourseCard />
        <RoleCourseCard />
      </div>
    </>
  );
}
