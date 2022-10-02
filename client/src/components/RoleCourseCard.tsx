import { Button } from "antd";
import role from "../assets/role.png"

export default function RoleCourseCard() {
  return (
    <div style={{ width: "400" }}>
      <div className="horizontal">
        <img src={role} alt="role icon" className="icon"/>
        <div>
          <h3>Role</h3>
          <p>Department:</p>
          <p>Senority:</p>
        </div>
      </div>
      <Button className="border cyan">Read More</Button>
    </div>
  );
}
