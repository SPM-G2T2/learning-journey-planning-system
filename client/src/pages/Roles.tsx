import { Steps } from 'antd';
import RoleCourseCard from '../components/RoleCourseCard';
export default function Roles({ lj }: { lj?: boolean }) {
  return (
    <>
      <h1 style={{ fontWeight: 700 }}>Create Your Desired Learning Journey</h1>

      <Steps labelPlacement='vertical' style={{width:"40vw", margin:"auto", marginTop:"5vh", marginBottom:"5vh"}}>
        <Steps.Step title="Choose a role"/>
        <Steps.Step title="Choose skills"/>
        <Steps.Step title="Choose courses"/>
      </Steps>
      <h1 style={{textAlign:"center"}}>Roles Selected</h1>

      <RoleCourseCard/>

      
    </>
  );
}
