import { Button } from "antd";
import role from "../assets/role.png"

export default function RoleCourseCard() {
  return (
    <div style={{ width: "50vw", justifyContent:"space-between", marginBottom: "1vw" }} className="horizontal card">
      <div className="horizontal">
        <img src={role} alt="role icon" className="icon"/>
        <div className="card-row" style={{margin:"1vw 0 0 1.5vw"}}>
          <p style={{fontSize:"1vw", fontWeight:"700"}}>Role</p>
          <p>Department:</p>
          <p>Description:</p>
        </div>
      </div>
      <Button className="border btn-color">Read More</Button>
    </div>
  );
}