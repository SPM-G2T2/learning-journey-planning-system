import { PropertySafetyFilled } from "@ant-design/icons";
import { Row, Col, Button, Pagination, Steps } from "antd";
import RoleCourseCard from "../components/RoleCourseCard";
import { Role } from "../types/Role";


export default function Roles() {

  return (
    <>
      <div style={{ width: '80%'}}>
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