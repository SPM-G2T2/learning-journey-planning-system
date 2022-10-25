import { PropertySafetyFilled } from "@ant-design/icons";
import { Row, Col, Button, Pagination, Steps } from "antd";
import RoleCourseCard from "../components/RoleCourseCard";
import Header from '../components/RolesHeader';
import CourseCard from "../components/SkillCard";
import { Role } from "../types/Role";
import { Course } from "../types/Course";


export default function Roles() {




  return (
    <>
      <h1>Roles</h1>
      <p>Truly</p>
<div style={}>




      <div>
      <RoleCourseCard handleClick={() => {}}/>
      
      </div>
      <div>
      <RoleCourseCard handleClick={() => {}}  />
      </div>
      <div>
      <RoleCourseCard handleClick={() => {}}  />
      </div>
      <div>
      <RoleCourseCard handleClick={() => {}}  />
      </div>

      </div>
    </>
  );
}
